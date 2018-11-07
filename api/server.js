const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

//endpoints

module.exports = server;
