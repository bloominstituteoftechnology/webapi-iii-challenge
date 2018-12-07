// create an express server
const express = require('express'); //inside package.json dependencies
const helmet = require('helmet');
const logger = require('morgan');

const customMW = require('./custom_middleware')


const userRouter = require('./routes/user_router.js');
const postRouter = require('./routes/post_router.js');

const server = express();
const PORT = 3000;

// CORS stuff
const cors = require('cors')
server.use(cors())

// middleware
server.use(
    express.json(),
    logger('dev'),
    helmet(),
    //customMW.gatekeeper
    customMW.uppercase
);

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send("We are live");
})



// listen
server.listen(PORT, err => {
    console.log(`server is up and running on ${PORT}`);
})