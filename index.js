const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 8001

const userDb = require('./data/helpers/userDb');

//** Middleware **//



//** Endpoints **//

//get
server.get('/api/users', (req,res) => {
    userDb
    .get()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(500).json({error: "user not found"}));
});
//get by id

//post

//put

//delete


server.listen(port, () => {
    console.log(`Its happening on port ${port}`);
});