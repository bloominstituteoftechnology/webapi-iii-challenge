//create server
const express = require('express');
const server = express();

//********GLOBAL MIDDLEWARE**********
server.use(express.json());


//*****ROUTER MIDDLEWARE***** */
const usersRouter = require('./routers/usersRouter')
const postsRouter = require('./routers/postsRouter')

server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)


//listener
const PORT = 4000;
server.listen(PORT, ()=>{
    console.log(`Server is up and listening on port ${PORT}`)
})