const express = require('express');
const cors = require('cors')

const server = express();

const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoute')

const PORT = 5000;

server.use(
  express.json(),
  cors()
);

//CRUD endpoints for posts
server.use('/api/posts', postRouter) 

//CRUD endpoints for users
server.use('/api/users', userRouter) 

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
