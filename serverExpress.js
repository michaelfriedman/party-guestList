  /* eslint-disable no-console */

'use strict';

const express = require('express');

const app = express();

app.disable('x-powered-by');

app.get('/guests', (req, res) => {
  const guests = ['Mary', 'Don'];
  res.send(guests);
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
