const express = require ('express');
const helmet = require ('helmet');
// const morgan = require ('morgan');
const cors = require ('cors');
const bodyParser = require ('body-parser');


const userRouter = require('./users/userRouter.js');
const postRouter = require('./users/postRouter.js');
const tagRouter = require('./users/tagRouter.js');


const server = express();


function logger(req, res, next) {
    next();
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);



server.get('/' ,( req ,res )=> {
    res.josn ({ api : 'running...'});
} );



const port = 500;
server .listen(port, () => console.log('API RRUNNING ON PORT 5000'));