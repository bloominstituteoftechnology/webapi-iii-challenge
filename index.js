const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');

const server = express();
const PORT = 5000;

server.use(express.json(), helmet(), logger('tiny'));

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', function(req, res) {
    res.send('We are live');  
});

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});