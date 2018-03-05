const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

server.listen(PORT, err => {
  if (err) {
    console.log(`ERROR! ${err}`);
  } else {
    console.loog(`SERVER! ${PORT}`);
  }
});