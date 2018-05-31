const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');
const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

server.get('/', (req, res) => {
        res.json('Howdy!')
});

//Users
server.get('/api/users/', (req, res) => {
    users
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
})
server.get('/api/users/:id', (req, res) => {
    users
    .get(req.params.id)
    .then(response => {
        console.log(response)
        if (!response) {
            res.status(404).json({ errorMessage: 'This User Does not Exist' })
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The User Could Not Be Retrieved' })
    })
})
server.post('/api/users/', (req, res) => {
    const { name } = req.body;
    if ( name ) {
        users
        .insert({ name })
        .then(response => {
            res.status(201).json({ id: response.id, name })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error adding your User" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide a name for your User"})
    }
})
server.delete('/api/users/:id', (req, res) => {
    users
    .remove(req.params.id)
    .then(response => {
        if(response === 1) {
        res.status(200).json({ message: "You have sucessfully deleted a User" })
        } else {
            res.status(404).json({ errorMessage: "The User you are attempting to delete does not exist" })
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Delete Failed"})
    })
})
server.put('/api/users/:id', (req, res) => {
    const { name } = req.body;
    if ( name ) {
        users
        .update(req.params.id, { name })
        .then(response => {
            if (response === 1) {
            res.status(200).json({ id: response.id, name })
            } else {
                res.status(404).json({ errorMessage: "The User you are trying to amend does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The User could not be changed"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide the User Name"})
    }
})
//Posts
server.get('/api/posts/', (req, res) => {
    posts
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
});
server.get('/api/posts/:id', (req, res) => {
    console.log(req.params.id)
    posts
    .get(req.params.id)
    .then(response => {
        console.log(response)
        if (response.length === 0) {
            res.status(404).json({ errorMessage: 'This Post Does not Exist' })
            console.log(response);
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The Post Could Not Be Retrieved' })
    })
})
server.post('/api/posts/', (req, res) => {
    const { text, userID } = req.body;
    if (text && userID) {
        posts
        .insert({ text, userID })
        .then(response => {
            res.status(201).json({ id: response.id, text, userID })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error saving the post to the database"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide some content"})
    }
})
server.delete('/api/posts/:id', (req, res) => {
    posts
    .remove(req.params.id)
    .then(response => {
        if (response === 1) {
            res.status(200).json({ message: "Deletion Success"})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})
server.put('/api/posts/:id', (req, res) => {
    const { text, userID } = req.body;
    if (text && userID) {
        posts
        .update(req.params.id, {text, userID})
        .then(response => {
            if (response === 1) {
                res.status(200).json({ id: response.id, text, userID})
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide content and a UserID for the post." })
    }
})
//Tags
server.get('/api/tags', (req, res) => {
    tags
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
});
server.get('/api/tags/:id', (req, res) => {
    console.log(req.params.id)
    tags
    .get(req.params.id)
    .then(response => {
        console.log(response)
        if (!response) {
            res.status(404).json({ errorMessage: 'This Tag Does not Exist' })
            console.log(response);
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The Tag Could Not Be Retrieved' })
    })
})
server.post('/api/tags/', (req, res) => {
    const { tag } = req.body;
    if (tag) {
        tags
        .insert({ tag })
        .then(response => {
            res.status(201).json({ id: response.id, tag})
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error saving the Tag to the database"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide a tag"})
    }
})
server.delete('/api/tags/:id', (req, res) => {
    tags
    .remove(req.params.id)
    .then(response => {
        if (response === 1) {
            res.status(200).json({ message: "Deletion Success"})
        } else {
            res.status(404).json({ message: "The tag with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The tag could not be removed" })
    })
})
server.put('/api/tags/:id', (req, res) => {
    const { tag } = req.body;
    if (tag) {
        tags
        .update(req.params.id, {tag})
        .then(response => {
            if (response === 1) {
                res.status(200).json({ id: response.id, tag})
            } else {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The tag information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide a tag" })
    }
})


server.listen(port, () => console.log(`Server running on port ${port}`));