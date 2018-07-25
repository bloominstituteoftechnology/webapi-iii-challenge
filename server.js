const express = require("express"); // CommonJS
const helmet = require("helmet");
const db = require("./data/dbConfig"); // <<<<< this

const server = express();

// add middleware
server.use(helmet());
server.use(express.json());

// configure routing/endpoints

server.listen(8000, () => console.log("\n=== API running... ===\n"));
