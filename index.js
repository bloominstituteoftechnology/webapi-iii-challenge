//required imports
const express = require("express");
const gatekeeper = require("./uppercase.js");
const userRouter = require("./Routers/user_router");
const postRouter = require("./Routers/post_router");
const cors = require('cors');

//set up server, parser and routes
const server = express();
server.use(
   express.json(),
   gatekeeper.uppercase,
   cors()
);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

// set port to 5000 or the enviornment port
const PORT = process.env.PORT || 5000;

//listen
server.listen(PORT, () => {
   console.log(`server running on ${PORT}`)
});