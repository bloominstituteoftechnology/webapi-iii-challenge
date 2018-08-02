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


// ==== MIDDDLEWARE ====

server.get('/users', (req, res) => {
    userDb.get()
        .then(response =>
            res.status(200).json(response)
        )
        .catch(() => {
            next({ code: 500, message: 'The users data could not be retrieved'})
        })
});

// ==== USER REQUESTS ====

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
            next({ code: 500, message: 'The users data could not be found'})
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
            next({ code: 500, message: 'There was an error posting the user'})
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
            next({ code: 500, message: 'There was an error deleting the user'})
        })
})

server.put('/users/:id', checkIfName, (req, res) => {
    const { id } = req.params;
    const user = req.body;
    userDb.update(id, user)
        .then( response => {
            if ( response < 1) {
                res.status(404).json({ message: 'The user with the spcified Id could not be found'})
            }
            res.status(200).json(user)
        })
        .catch(() => {
            next({ code: 500, message: 'There was an error updating the user'})
        })
})


// ======= POST REQUESTS ========

server.get('/users/posts/:id', (req, res) => {
    const { id } = req.params;

    userDb.getUserPosts(id)
        .then( response => {
            res.status(200).json(response)
        })
        .catch(() => {
            next({ code: 500, message: 'There was an error getting the users posts' })
        })
})


// ====== ERROR MIDDLEWARE ======

server.use((err, req, res, next) => {
    res.status(500).send({ success: false, data: undefined, error: err.message });
})

server.listen(8000, () => console.log('\n === API running... === \n'))

