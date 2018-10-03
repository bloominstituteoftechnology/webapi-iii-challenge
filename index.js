const express = require('express');

const port = 9000;

const server = express();

///////////////
// Middlewares
///////////////

///////////////
// Routes
///////////////

///////////////
// Listen
///////////////
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
