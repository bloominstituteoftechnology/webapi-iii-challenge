// importing node modules 
// importing express and db
const express = require('express');
const db = require('./data/dbConfig')

// server code 
const port = 5000;
const server = express();
server.use(express.json());

// root route 
server.get('/', (req, res) => {
    res.send('Hello from express node blog')
});


// server listening for traffic
server.listen(port, () => console.log(`server running on port ${port}`));