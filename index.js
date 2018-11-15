const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.json('Hello World!');
})

server.listen(3333, () => console.log('Server is listening on port 3333.'));

//Start of Posts API
// Get all posts
server.get('/api/posts', (req, res) => {
    db.get()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
});

// Get post by ID
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.get(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });

        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
})

// Creating a new post
server.post('/api/posts', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    db.insert(id, {title, contents})
    .then(post => {
        if (post) {
            res.status(200);
        } else if (post.title.length === 0 || post.contents.length === 0){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } 
    })
    .catch(err => {
        res.json(500).json({ error: "Error creating a new post, please try again." })
    })
})

// Updating a post
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    db.update(id, {title, contents})
    .then(post => {
        if (post) {
            res.status(200);
        } else if (post.title.length === 0 || post.contents.length === 0){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.json(500).json({ error: "The post information could not be modified." })
    })
})

// Removing a post
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(post => {
        if (post) {    
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
        .catch(err => {
        res.status(500).json({message: "The post could not be removed"});
    })
});
//End of Posts API

//Start of Users API

// Get all users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

// Get user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });

        } else {
            res.status(200).json(user);
        }
    })
    .catch(err => {
        res.status(500).json({ error: "This user's information could not be retrieved." });
    });
})

// Creating a new user
server.post('/api/users', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.insert(id, {name})
    .then(user => {
        if (user) {
            res.status(200);
        } else if (user.name.length === 0) {
            res.status(400).json({ errorMessage: "Please provide name for the user." })
        }  else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.json(500).json({ error: "Error creating a new user, please try again." })
    })
})

// Updating a user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.update(id, { name })
    .then(user => {
        if (user) {
            res.status(200);
        } else if (user.name.length === 0 || user.name.length === 0){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.json(500).json({ error: "The user information could not be modified." })
    })
})

// Removing a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(user => {
        if (user) {    
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
        .catch(err => {
        res.status(500).json({message: "The user could not be removed"});
    })
});
//End of Users API