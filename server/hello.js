// Import required modules
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kanishka@38',
    database: 'bse'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);

    // Create tables if they don't exist
    const createHciBase64TableQuery = `
        CREATE TABLE IF NOT EXISTS hci_base64 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            base64_data TEXT
        )
    `;
    const createTableHeadersTableQuery = `
        CREATE TABLE IF NOT EXISTS table_headers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            table_name VARCHAR(255),
            headers TEXT
        )
    `;
    connection.query(createHciBase64TableQuery, (err, result) => {
        if (err) {
            console.error('Error creating hci_base64 table:', err);
            return;
        }
        console.log('hci_base64 table created or already exists.');
    });
    connection.query(createTableHeadersTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table_headers table:', err);
            return;
        }
        console.log('table_headers table created or already exists.');

        // Fetch and insert table headers after tables are created
        fetchAndInsertTableHeaders();
    });
});

// Fetch and insert table headers into table_headers table
function fetchAndInsertTableHeaders() {
    connection.query(`
        INSERT INTO table_headers (table_name, headers)
        SELECT DISTINCT table_name, GROUP_CONCAT(column_name) 
        FROM information_schema.columns 
        WHERE table_schema = 'bse'
        AND table_name NOT IN (SELECT table_name FROM table_headers)
        GROUP BY table_name;
    `, (err, result) => {
        if (err) {
            console.error('Error fetching and inserting table headers:', err);
            return;
        }
        console.log('Table headers inserted into table_headers table.');
    });
}

// Define route to fetch and display data
app.get('/', (req, res) => {
    // Fetch table headers from MySQL for the 'hci' table
    connection.query("SELECT headers FROM table_headers WHERE table_name = 'hci'", (err, headerResults) => {
        if (err || headerResults.length === 0) {
            console.error('Error fetching table headers from MySQL: ' + (err ? err.stack : 'Headers not found'));
            res.status(500).send('Internal Server Error');
            return;
        }
        
        // Parse the headers into an array
        const headers = headerResults[0].headers.split(',');

        // Construct HTML table headers
        let tableHeaders = '<tr>';
        headers.forEach((header) => {
            tableHeaders += `<th>${header}</th>`;
        });
        tableHeaders += '</tr>';

        // Fetch data from MySQL for the 'hci' table
        connection.query('SELECT * FROM hci', (err, dataResults) => {
            if (err) {
                console.error('Error fetching data from MySQL: ' + err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            connection.query("SELECT css_content FROM css_templates WHERE name = 'data_template'", (err, cssResults) => {
                if (err || cssResults.length === 0) {
                    console.error('Error fetching CSS template from MySQL: ' + (err ? err.stack : 'CSS template not found'));
                    res.status(500).send('Internal Server Error');
                    return;
                }
                const cssContent = cssResults[0].css_content;

                // Construct HTML table with fetched data and headers
                let tableHtml = `<html>
                    <head>
                        <title>HCI Data</title>
                    </head>
                    <style>
                        ${cssContent}
                    </style>
                    <body>
                        <div class="containerhead">
                            <div class="cardhead">
                                <a href="/"><img style="width: 106px; height: 26px;" src="/static/logo.png" alt="logo"></a>
                            </div>
                            <div class="headcont no-scrollbar">
                                <a class="headnews" href='/'>News</a>
                                <a class="headannouncement" href='/news'>Announcements</a>
                                <a class="headdata" href='/data'>Data</a>
                                <a class="headcompany" href='/company'>Stocks</a>
                                <a class="headmutule-funds" href='/mutual-funds'>Mutual funds</a>
                            </div>
                        </div>
                        <div class="title">HCI Data</div>
                        <table>
                            ${tableHeaders}`;
                dataResults.forEach((row) => {
                    tableHtml += `<tr>`;
                    headers.forEach((header) => {
                        tableHtml += `<td>${row[header]}</td>`;
                    });
                    tableHtml += `</tr>`;
                });
                tableHtml += `</table>
                    </body>
                </html>`;

                // Encode HTML content into Base64
                const base64String = Buffer.from(tableHtml).toString('base64');

                // Check if hci_base64 table entry exists
                connection.query("SELECT * FROM hci_base64 WHERE id = 0", (err, result) => {
                    if (err) {
                        console.error('Error checking hci_base64 table:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    const tableIsEmpty = result.length === 0;
                    if (tableIsEmpty) {
                        // Insert new entry
                        connection.query("INSERT INTO hci_base64 (id, base64_data) VALUES (0, ?)", [base64String], (err, result) => {
                            if (err) {
                                console.error('Error inserting new entry into hci_base64 table:', err);
                                res.status(500).send('Internal Server Error');
                                return;
                            }
                            console.log('New entry inserted into hci_base64 table.');
                            res.send(tableHtml);
                        });
                    } else {
                        // Update existing entry
                        connection.query("UPDATE hci_base64 SET base64_data = ? WHERE id = 0", [base64String], (err, result) => {
                            if (err) {
                                console.error('Error updating hci_base64 table:', err);
                                res.status(500).send('Internal Server Error');
                                return;
                            }
                            console.log('Data updated in hci_base64 table.');
                            res.send(tableHtml);
                        });
                    }
                });
            });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
