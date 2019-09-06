// code away!
// require("dotenv").config();

const server = require("./server.js");

const port = 7777;
// const port = process.env.PORT || 5525;

// server.listen(port, () => {
//   console.log(`\n** Server Running on ${port} **\n`);
// });

server.listen(port, () => console.log(`\n Check out my API ON  ${port} **\n`));
