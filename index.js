const express = require('express');
const server = express();

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());


const checkIfName = (req,res,next) => {
    const { name } = req.body;
    if (name == null) {
        return res.status(400).json({ errorMessage: 'Please provie a name for the user' })
    } else {
        next();
    }
};


server.get('/users', (req, res) => {
    userDb.get()
        .then(response =>
            res.status(200).json(response)
        )
        .catch(() => {
            res.status(500).json({ error: 'The users data could not be retrieved '})
        })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: 'The user with this data does not exist'})
            }
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'The users data could not be found'})
        })
});

server.post('/users', checkIfName, (req, res) => {
    const user = req.body;
    console.log(user);
    userDb.insert(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the user to the database' })
        })
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(response => {
            if( response < 1) {
                res.status(404).json({ message: 'the user with the specified ID does not match any existing files' })
            }
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'There was an error while deleting the user from the database' })
        })
})


server.listen(8000, () => console.log('\n === API running... === \n'))

