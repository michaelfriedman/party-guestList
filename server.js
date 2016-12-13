/* eslint-disable no-console */

'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/guests') {
    const guests = ['Mary', 'Don'];
    const guestsJSON = JSON.stringify(guests);
    res.setHeader('Content-Type', 'application/json');
    res.end(guestsJSON);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});
const port = 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
