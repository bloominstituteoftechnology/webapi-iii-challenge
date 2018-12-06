//required imports
const express = require("express");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagDB = require("./data/helpers/tagDb.js");
const gatekeeper = require("./uppercase.js");
const userRouter = require("./Routers/user_router");

//set up server, parser and routes
const server = express();
server.use(
   express.json(),
   gatekeeper.uppercase
);

server.use("./user_router.js", userRouter);

// set port to 5000 or the enviornment port
const PORT = process.env.PORT || 5000;

//listen
server.listen(PORT, () => {
   console.log(`server running on ${PORT}`)
});