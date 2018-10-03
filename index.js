// add imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// instantiate server
const server = express();

// add global middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("default", "dev"));

// listen to port 8000 and give a startup message from the server
server.listen(8000, () => console.log("API listening on port 8000"));
