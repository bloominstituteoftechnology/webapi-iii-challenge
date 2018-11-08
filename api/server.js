const express = require("express");
const knex = require("knex");
const sqlite3 = require("sqlite3");
const userDb = require("../data/helpers/userDb.js");

const server = express();

server.use(express.json());
server.use(knex());
server.use(sqlite3());

server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't get users " });
    });
});
