const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./data/users/userRouter.js');

const server = express();

//custom middleware
function logger(req, res, next) {
    //next points to the next middleware
    console.log('body: ', req.body);
    req.url = `${req.url}/1`;
    // res.send('done');

    next();
}

//middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);

server.get('/', function(req, res) {
    res.send({ api: 'Running...' });
});

const port = 5100;
server.listen(port, () => console.log('Port 5100 is lit, so is this headache'));