const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.get('/', (req, res) => {
    res.send('Orange e30');
})

const port = 3400;
server.listen(port, () => console.log(`API running on Port ${port}`));