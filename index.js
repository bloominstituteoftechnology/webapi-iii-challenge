// console.log('something is running! YO!');

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const middleware = require('./middleware');
const userRouter = require('./routers/user_router');
const postRouter = require('./routers/post_router');

const server = express();
const PORT = process.env.PORT || 5050;

server.use(express.json());
server.use(helmet());
server.use(logger('tiny'));
server.use(cors());

server.use(middleware.capitalizeFirstLetter);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.json({message: "request recieved, YO YO YO!"})
});

// Keep this last!

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});