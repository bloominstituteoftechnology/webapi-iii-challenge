// all required imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");


// next we got to get the server going and add middleware

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("default", "dev"));


server.listen(8000, () => console.log("===API port 8000==="));
