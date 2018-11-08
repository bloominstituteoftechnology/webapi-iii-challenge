const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require('./routers/postRouter.js');
const userRouter = require('./routers/userRouter.js');
const port = 8000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/posts', postRouter);

server.use('/api/users', userRouter);

server.listen(port, () => console.log(`\nApi running on port ${port}\n`));