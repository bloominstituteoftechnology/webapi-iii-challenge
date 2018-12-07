const express = require('express');

const nameMW = require('./middleware/capName');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');

const server = express();
const PORT = 3333;

server.use(
    express.json(),
    nameMW.capName
    );

    server.get('/', (req, res) => {
        res.json({message: "success"})
    });

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);


server.listen(PORT, err => {
    console.log(`server is listening on port ${PORT}`)
});