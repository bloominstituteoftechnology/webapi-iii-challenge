const express = require('express');
const userDb = require('./data/helpers/userDb')

const server = express();
server.use(express.json());

function setToUpperCase(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

// get all users
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({message: error})
    })
});

// get user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    userDb.get(id)
        .then( user => {
            console.log('Get user by ID', user);
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'User Not Found'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: error})
        })
});

// get users posts
server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;

    userDb.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
});

// create a new user
server.post('/api/users', setToUpperCase, (req, res) => {
    const user = req.body;
    const { name } = user;
    console.log('Post req.body:', user);

    if(!name) {
        res.status(400).json({message: "Name require"})
    }

    userDb.insert(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            res.status(500).json({ message: error})
        })
});

// Update an existing user
server.put('/api/users/:id', setToUpperCase, (req, res) => {
    const { id } = req.params;
    const user = req.body;

    userDb.update(id, user)
        .then(count => {
            if(count) {
                res.status(200).json({ message: `${count} user updated`})
            } else {
                res.status(404).json({ message: 'user ID does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: error})
        })
});

// Delete a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    userDb.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} user delete`})
            } else {
                res.status(404).json({ message: 'user ID does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
});


const port = 9000;
server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});