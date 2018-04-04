const express = require('express');
const postDb = require('./data/helpers/postDb.js');


const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//import routers
const postsRouter = require('./data//routers/postsRouter.js');

const server = express();

server.use(express.json());

server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.json({api: 'running'});
})

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
