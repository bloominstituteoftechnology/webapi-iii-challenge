// imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes/apiRoutes');

// init server
const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan());

// speak in JSON
server.use(express.json());

// log all method calls and addresses
function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`)

    next();
}

server.use(logger);

// Use router for calls to '/api'
server.use('/api', apiRoutes);

server.get('/', (req, res) => {
    res.send('Hello World!');
})

/*****************************************/
/*** TAG METHODS ***/
/*****************************************/

// TODO

// write a function that will receive three or four arguments.
// add it to the middleware queue.

// Users
// id: number, no need to provide it when creating users, the database will generate it.
// name: up to 128 characters long, required.
// Posts
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.

const port = 8000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})