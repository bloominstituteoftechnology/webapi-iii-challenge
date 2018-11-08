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


/*function nameToUpperCase(req, res, next) {
    const { body } = req;
    if (!body.name.length) {
        res.status(400).json({ message: 'A name is required' })
    }
    req.body.name = body.name.toUpperCase();
    next();
}*/

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/posts', postRouter);

server.use('/api/users', userRouter);

server.listen(port, () => console.log(`\nApi running on port ${port}\n`));