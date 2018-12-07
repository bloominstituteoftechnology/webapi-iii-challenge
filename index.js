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
        .json(users)
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
        if(user){
            res
            .status(200)
            .json(user)
        } else {
            res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        }
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
    if(user.name){
        userdb.insert(user)
        .then(idInfo =>{
            userdb.get(idInfo.id)
            .then(newUser=>{
                res
                .status(201)
                .json(newUser);
            })
        })
        .catch(err=>{
            res
            .status(500)
            .json({ error: "There was an error while saving the user to the database" })
        })
    } else {
        res
        .status(400)
        .json({errorMessage: "Please provide a name for the user." })
    }
})


//PUT

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const userName = req.body
    userdb.update(id, userName)
    .then( count =>{
        if(count === 1){
            if(userName.name){
                res
                .status(200)
                .json(userName)
            } else{
                res
                .status(400)
                .json({errorMessage: "Please provide the name for the user." })
            }
        } else {
            res
            .status(404)
            .json({message: "The user with the specified id does not exist"})
        }
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
