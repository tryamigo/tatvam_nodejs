// app.js
const express = require('express');
const mysql = require('mysql2');

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
});

// Define route to fetch and display data
app.get('/', (req, res) => {
    // Fetch data from MySQL
    connection.query('SELECT * FROM hci', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL: ' + err.stack);
            return;
        }

        // Construct HTML table with fetched data
        let tableHtml = '<table><tr><th>Year</th><th>HCI</th></tr>';
        results.forEach((row) => {
            tableHtml += `<tr><td>${row.Year}</td><td>${row.HCI}</td></tr>`;
        });
        tableHtml += '</table>';

        // Send HTML response
        res.send(`
            <html>
            <head>
                <title>HCI Data</title>
            </head>
            <body>
                <h1>HCI Data</h1>
                ${tableHtml}
            </body>
            </html>
        `);

        // Close MySQL connection
        connection.end();
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
