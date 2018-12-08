const express = require('express');
const postDB = require('./data/helpers/postDb');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');

const server = express();
const parser = express.json();
server.use(parser);

server.use('/users', userRouter);
server.use('/posts', postRouter);


server.get('/', (req, res) => {
    res.send('We are live');
})


const PORT = 5050;
server.listen(PORT, () => {
    console.log(`Server is super running on port ${PORT}.`);
})
