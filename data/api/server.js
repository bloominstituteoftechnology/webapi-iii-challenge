module.exports = {
  listen: (port, callback) => {
    console.log('ran the server');
    callback();
  }
}
const express = require('express');
const start = express();
start.use(express.json());

start.get('/', (req, res) => {
  res.send('Server is operational')
});
