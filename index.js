// code away!
const express = require('express');
const server = express();
const PORT = 8080;
const userDb = require('./data/helpers/userDb')

server.use(express.json());

console.log('let us get started');

server.get('/', (req, res) => {
    res.send(`hi there from inside an initial get function, on port ${PORT}`)
})

// get a list of all our users

server.get('/api/users', (req, res) => {
    userDb.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those`)
    })
})

// get a specific user 

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
    .then(user => {
        if(user){
            res.json(user);
        } else {
            status(404)
            res.json(`Huh, don't know that user`)
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that user')
    })
})

// add user

server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('user from body:', user)
    userDb.insert(user).then(user => {
        console.log('user from insert method:', user);
        res.json(user);
    }).catch(err => {
        res
        .status(500)
        .json('Error: failed to add user')
    })
})


server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;

    userDb.remove(id)
    .then(count => {
        if(count) {
            res.json('user was successfully deleted')

        } else {
            res.status(404).json('invalid ID')
        }

    })
    .catch(err => {
        res.status(500).json('I could not delete that user')
    })

})


// *>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*
server.listen(PORT, () => {
  console.log(`server is alive on port ${PORT}`)
})