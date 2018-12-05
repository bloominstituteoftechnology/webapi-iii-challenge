//node modules

const express = require('express');

const userdb = require('./data/helpers/userDb');


//server code

const server = express();
const parser = express.json()
const PORT = 8000;

server.use(parser);

//GET

server.get('/api/users', (req, res) =>{
    userdb.get()
    .then((users)=>{
        res
        .status(200)
        .json(users);
    })
    .catch(err=>{
        res
        .status(500)
        .json({error: "The posts information could not be retrieved." })
    });

});

//POST

//PUT

//DELETE

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});
