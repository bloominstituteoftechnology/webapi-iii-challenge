const express = require('express');

const server = express();

const helmet = require('helmet');

const cors = require('cors');

const logger = (req, res, next ) => {
    console.log(req.params)
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);


server.get('/', (req, res) => {
    res.send({ api: 'Running...' })
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));