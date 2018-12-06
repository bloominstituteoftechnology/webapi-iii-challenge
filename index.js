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
        .json({error: "The users information could not be retrieved." })
    });

});

server.get('/api/users/:id', (req, res) =>{
    const { id }  = req.params
    userdb.get(id)
    .then(user =>{
        res
        .json(user);
    })
    .catch(err =>{
        res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    })
});

//POST
server.post('/api/users', (req, res) =>{
    const user = req.body
    userdb.insert(user)
    .then(id =>{
        res
        .status(200)
        .json(id);
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "There was an error while saving the user to the database"})
    })
})


//PUT

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const userName = req.body
    userdb.update(id, userName)
    .then( count =>{
        res
        .status(200)
        .json(userName)
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The user information could not be modified."})
    })
})

//DELETE

server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    userdb.remove(id)
    .then( count =>{
        res
        .status(200)
        .json(count)
    })
    .catch( err =>{
        res
        .status(500)
        .json({error: "The user could not be removed"})
    })
})

server.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});
