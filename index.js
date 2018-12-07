const express = require('express');
const userdb = require('./data/helpers/userDb');

const server=express();
const PORT = 5555;
server.use(express.json());

//custom middleware to make sure POST and PUT requests have names properly capitalized
function nameCap(req, res, next) {
    //first pull name off the sent request
    let {name} = req.body;
 //then reassign that value with one where all first letters have been capitalized
    req.body.name=name.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
 //then call the next middleware (in this example, the POST and PUT routehandlers)
    next();
}

//CRUD get
server.get('/api/users', (req, res) =>{
    userdb.get()
    .then(users=>{
        res.status(200)
        .json(users)
    })
    .catch(error =>{
        res.status(500)
        .json({error: "The users could not be retrieved."})
    })
})

server.listen(PORT, ()=>console.log('Server is listening on port 5555')); 