const express = require('express');

const server = express('short');

logger = (req, res, next) => {
    console.log(`${req.method} to ${req.url}`)
    next();
}

server.use(logger);


server.get('/', (req, res) =>{
    res.send('running')
})

server.listen(5000, () =>     
    console.log(`server is listening on port 5000`));