const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();
const PORT = '4500';

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));



server.get('/', (req,res) => {
     res.status(404)
        .send({errorMessage: "Not able to get it"})
     console.log('server is running now');
});

server.listen(PORT, () => {
     console.log(`Server is running at ${PORT}`);
})