const express = require("express");
const cors = require("cors");

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Testing 1,2,3. Hello!");
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
