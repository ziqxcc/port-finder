const express = require('express');
const app = express();
const net = require('net');

let currentPort = 8000;

function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.on('error', () => {
            findAvailablePort(startPort + 1)
                .then(resolve)
                .catch(reject);
        });
        server.listen(startPort, '127.0.0.1', () => {
            server.close(() => {
                resolve(startPort);
            });
        });
    });
}

app.get('/get-port', (req, res) => {
    findAvailablePort(currentPort)
        .then(port => {
            currentPort = port + 1; // Increment port for the next request
            res.json({ port });
        })
        .catch(error => {
            res.status(500).json({ error: "Could not find available port" });
        });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Port Finder Server is running on port ${port}`);
});
