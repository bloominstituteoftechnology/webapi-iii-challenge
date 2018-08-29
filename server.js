const express = require('express');

const db = require ('./data/dbConfig.js');

const server = express();

//Middleware here (practice)
function greeter(req, res, next) {
    req.name = 'FSW 12: Middleware Enthusiasts';
    next();
}

//Initiate the Server at /
server.get('/',(req, res) => {
    res.send('Initiating Server');
});

server.get('/hello', greeter, (req,res) =>{
    res.send(`hello ${req.name}`);
});

//Start the server
server.listen(9000, () => console.log('\n == API on port 9000 == \n'));