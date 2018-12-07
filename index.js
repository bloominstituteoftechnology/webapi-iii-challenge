const express = require('express')
const PORT = 4000;
const helmet = require("helmet");
const logger = require("morgan");

const server = express()
const userRouter = require("./routers/users")
const postsRouter = require("./routers/posts")



server.use(express.json(), logger("tiny"), helmet())
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
}) 