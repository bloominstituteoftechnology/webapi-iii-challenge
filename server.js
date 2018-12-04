//grab database methods
const userdb = require('./data/helpers/userDb')
const postdb = require('./data/helpers/postDb')

//create server
const express = require('express');
const server = express();
server.use(express.json());

//****USER ROUTE HANDLERS*************
server.get('/api/users', (req, res) =>{
    userdb.get()
    .then(users =>{
        res.json(users)
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to retrieve users"})
    })
});
server.get('/api/users/:id', (req, res) =>{
    const id = req.params.id;
    userdb.get(id)
    .then(user =>{
        res.json(user)
    })
});


//listener
const PORT = 4000;
server.listen(PORT, ()=>{
    console.log(`Server is up and listening on port ${PORT}`)
})