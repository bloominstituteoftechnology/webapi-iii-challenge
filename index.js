const express = require('express');
const cnfgmdlwr = require('./config/mdlwr');
const usrRts = require('./usrs/usrRts');
const pstRts = require('./psts/pstRts');

const server = express();
const port = 5000;

cnfgmdlwr(server);

server.use('/usrs', usrRts);
server.use('/psts', pstRts);

server.listen(port, () => {
    console.log(`API running on ${port}`);
});