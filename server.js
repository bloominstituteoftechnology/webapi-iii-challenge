const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 6666;



const usersRouter = require('./data/Routers/User.js');
const postsRouter = require('./data/Routers/Post.js')



const logger = (req, res, next ) => {
    console.log(req.body)

    next();
};




server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);


server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);



server.get('/', (req, res) => {
    res.send({message: 'Server is running'});
});


server.listen(port, () => console.log(`API is running on ${port} port!`));

