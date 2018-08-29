const express = require('express');
const cors = require('cors');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();


server.use(cors());

server.get('/', (req, res) => {
  userDb.get()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log('err ', err);
    })
  res.status(200).json({ message: 'success' });
})

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
