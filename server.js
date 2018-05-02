const express = require("express");
const db = require('./data/dbConfig.js')

const server = express();

server.use(express.json());

server.listen(5000, () => console.log("Listening on port 5000"));