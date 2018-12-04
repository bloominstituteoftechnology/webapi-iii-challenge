const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();
server.use(express.json());

const PORT = '4500';

server.get('/', (req,res) => {
     console.log('server is running now');
});

server.listen(PORT, () => {
     console.log(`Server is running at ${PORT}`);
})