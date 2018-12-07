const express = require('express');
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const middleware = require('./custom_middleware');


const server = express();
const parser = express.json();
server.use(parser);


//User Endpoints

server.get('/users', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve users." })
    })
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userDB.getUserPosts(id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404)
            .json({ message: "There are no posts by this user ID." })
        }})
        .catch(err => {
            res.status(500).json({ error: "Unable to retrieve posts." })
        })
})

server.post('/users', middleware.uppercase, (req, res) => {
    const user = req.body;
    if (user.name) {
    userDB.insert(user)
    .then(info => {
        userDB.getUserPosts(info)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404)
            .json({ message: "There are no posts by this user ID." })
        }})
    }).catch(err => {
        res.status(500).json({ error: "There was an error while saving this user to the database"})
    })
    } else {
        res.status(400).json({errorMessage: "Please provide a user name."})
    }
});

server.delete('/users/:id', (req,res) => {  
    const {id} = req.params;
    userDB.remove(id)
    .then(resolution => {
        res.json({ message: "Successfully Deleted" })
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
});

server.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const user = req.body;
    if (user.name) {
    userDB.update(id, user)
    .then (success => {
        res.status(200).json({ message: "Update Successful" })
    })
    .catch(err => {
        res.status(500).json({ error: "User could not be modified." });
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide a user name." })
    }
});


//Post Endpoints
server.get('/posts', (req, res) => {
    postDB.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve posts." })
    })
})

const PORT = 5050;
server.listen(PORT, () => {
    console.log(`Server is super running on port ${PORT}.`);
})
