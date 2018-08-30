const express = require("express");
const server = express();

const configureMiddleware = require("./middleware/middleware.js");

configureMiddleware(server);

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
