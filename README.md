# Port Finder Server
A lightweight **Node.js** server that dynamically finds available local ports on your machine.


This project runs as a separate process and responds to HTTP requests with the next available port. Useful for scenarios where multiple services need free ports without conflicts.

## Features
- Finds the next available local port starting from a configurable port.
- Increments the port for each new request.
- Simple HTTP API for easy integration with other processes.
- Minimal dependencies, built with Node.js and Express.

## Installation
```sh
git clone https://github.com/fathah/port-finder.git
cd port-finder-server
npm install
```

## Usage

Start the server:
```
node index.js
```
By default, the server runs on port 3000.

### API
```sh
GET http://localhost:3000/get-port
```
Response:
```json
{
  "port": 8000
}
```
> The returned port is guaranteed to be free at the moment of the request. The server will increment the port for subsequent requests.

### Example Use Case

You can run this server as a separate process and query it whenever you need a free port for spawning new services:

```js
const axios = require('axios');

async function getFreePort() {
    const response = await axios.get('http://localhost:3000/get-port');
    return response.data.port;
}

getFreePort().then(port => {
    console.log(`Use this port: ${port}`);
});
```
