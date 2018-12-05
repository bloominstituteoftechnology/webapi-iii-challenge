const express = require('express');
const morgan = require('morgan');

const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDB");

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(morgan('dev'));

server.get("/users", (req, res) => {
    userDB.get()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ error: "Error getting users" });
      });
});


server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});