const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const PORT = 5050;
const logger = require('morgan');
const helmet = require('helmet');
const userRouter = require('./routers/userRouter.js');
const postRouter = require('./routers/postRouter.js');
const tagRouter = require('./routers/tagRouter.js');
const customMW = require('./customMiddleware');

server.use(express.json());
server.use(cors({}));
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);
server.use(customMW.upperCase);


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});



