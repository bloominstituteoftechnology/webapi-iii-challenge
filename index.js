const express = require("express");
const PORT = 4000;
const cors = require('cors')
const helmet = require("helmet");
const logger = require("morgan");
// const myMW = require("./middleware.js")

//Express Server
const server = express();
const userRouter = require("./routers/users_router")
const postRouter = require("./routers/posts_router")
//middleware
server.use(express.json(), logger("tiny"), helmet(), cors());
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)




server.listen(PORT, () => {
console.log(`server is up and running on port ${PORT}`);
});
