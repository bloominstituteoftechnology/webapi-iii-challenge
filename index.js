const express = require('express')
const PORT = 4000;
const helmet = require("helmet");
const logger = require("morgan");
const cors = require('cors');
const server = express()
const userRouter = require("./routers/users")
const postsRouter = require("./routers/posts")

server.use(express.json(), logger("tiny"), helmet(), cors())
server.use('/api/users', userRouter)
server.use('/api/posts', postsRouter)

server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
}) 