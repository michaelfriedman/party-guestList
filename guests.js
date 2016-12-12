'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

const node = path.basename(process.argv[0]);
const file = process.argv[1];
const cmd = process.argv[2];
// 
// console.log(node);
// console.log(file);
// console.log(cmd);

// fs.readFile(guestsPath, 'utf8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//
//   const guests = JSON.parse(data);
//
//   console.log(Array.isArray(guests));
//
//   console.log(guests);
// });

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const guests = JSON.parse(data);

    console.log(guests);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
