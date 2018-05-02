//importing express
const express = require('express');
//add middleware
const server = express();

//get method
server.get('/', (req, res) => {
    console.log('Running');
    res.send('Running now!');
})

//server attached to a port
const port = 5000;
server.listen(port, () => {'== Server is listening on port 5000 =='});