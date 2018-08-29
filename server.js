const express = require('express');

const db = require ('./data/dbConfig.js');

const server = express();

//Initiate the Server at /
server.get('/',(req, res) => {
    res.send('Initiating Server');
});

//Start the server
server.listen(9000, () => console.log('\n == API on port 9000 == \n'));