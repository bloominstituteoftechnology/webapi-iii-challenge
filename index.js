// add imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// instantiate server
const server = express();

// add global middleware
server.add(express.json());
server.add(cors());
server.add(helmet());
server.add(morgan("default", "dev"));
