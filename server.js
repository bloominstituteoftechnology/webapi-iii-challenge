const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5001;
const server = express();

server.use(express.json());
server.use(cors());

const sendUserError = (status, message, res) => {
    res.status(staus).json({ errorMessage: message });
    return;
}

server.get('/api/users', (req, res) => {
    users.get()
        .then(posts => {
            res.json(posts);
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.get(id)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
});


server.get('/api/user/posts/:id', (req, res) => {
    const { id } = req.params;
    users.getUserPosts(id)
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
})

server.get('/api/post/tags/:id', (req, res) => {
    const { id } = req.params;
    posts.getPostTags(id)
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error });
        });
})


server.post('/api/users', (req, res) => {
    const { name } = req.body;
    users.insert({name})
        .then(user => {
            res.json( user );
        })
        .catch(error => {
            console.log(error);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
        .then(response => {
            if (response === 1) {
                res.send('hello you have deleted');
            } else {
                res.send('sorry cant find that');
            }
        })
        .catch(error => {
            console.log(error);
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users.update(id, {name})
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            console.log(error);
        })
})


server.listen(port, () => console.log(`Server running on port, ${port}`));