  /* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');

const guestsPath = path.join(__dirname, 'guests.json');

const express = require('express');

const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Read all

app.get('/guests', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const guests = JSON.parse(guestsJSON);
    res.send(guests);
  });
});

// Create

app.post('/guests', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (readErr, guestsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }

    const guests = JSON.parse(guestsJSON);
    const guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);
    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

// Read one

app.get('/guests/:id', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

// Update

app.patch('/guests/:id', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (readErr, guestsJSON) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    const id = Number.parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }
    guests[id] = guest;

    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.delete('/guests/:id', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (readErr, guestsJSON) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    const guest = guests.splice(id, 1)[0];
    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
