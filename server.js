/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const guestsPath = path.join(__dirname, 'guests.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Service Error');

        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
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
