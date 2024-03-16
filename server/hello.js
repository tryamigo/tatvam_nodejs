// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define port number
const PORT = 3000;

// Function to start the server
function startServer() {
  // Create HTTP server
  const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Read the HTML file
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, data) => {
      if (err) {
        // If there's an error reading the file, respond with an error message
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      // Write the HTML content as the response body
      res.end(data);
    });
  });

  // Start listening on the specified port
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the startServer function
module.exports = {
  start: startServer
};
