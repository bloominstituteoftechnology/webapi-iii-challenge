const express = require('express');
//const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ orign: 'https://localhost:3000' }));
server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    //return;
};

server.get('/api/users', (req, res) => {
    users.get()
    .then(getUsers => {
        res.json(getUsers) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
    .get(id)
    .then(users=> {
        if (users.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(users); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'No name' });
        return;
    } 
    users
        .insert({ name })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
    })
})

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then(count => {
            if (count !== 1) {
                res.status(400).json({errorMessage: "Did not update"});
            } else {
                res.status(210).json({id, name});
            }
        })
        .catch(err => {
            console.log(err);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete'});
            } else {
                res.status(201).json({message: 'successfully deleted'});
            }
    })
})





server.get('/api/tags', (req, res) => {
    tags.get()
    .then(tags => {
        res.json(tags) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags.get(id)
    .then(tag => {
        if (tag.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(tag); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: 'No tag' });
        return;
    } 
    tags
        .insert({ tag })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
    })
})

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete'});
            } else {
                res.status(201).json({message: 'successfully deleted'});
            }
    })
})

server.put('/api/tags/:id', (req, res) =>{
    const { id } = req.params;
    const { tag } = req.body;
    tags
        .update(id, { tag })
        .then(count => {
            if (count !== 1) {
                res.status(400).json({errorMessage: "Did not update"});
            } else {
                res.status(210).json({id, tag});
            }
        })
        .catch(err => {
            console.log(err);
        })
})




server.get('/api/posts', (req, res) => {
    posts.get()
    .then(posts => {
        res.json(posts) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts.get(id)
    .then(post => {
        if (post.length === 0) {
            sendUserError(404, 'The post with the specified ID does not exist.', res);
            return;
        }
        res.json(post); 
    })
        .catch(error => {
            sendUserError(500, 'The post information could not be retrieved.', res);
    });
});

server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if (!text ) {
        res.status(400).json({ errorMessage: 'No text or id' });
        return;
    } 
    posts
        .insert({ text, userId })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete'});
            } else {
                res.status(201).json({message: 'successfully deleted'});
            }
    })
})

server.put('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    const { text } = req.body;
    posts
        .update(id, { text })
        .then(count => {
            if (count !== 1) {
                res.status(400).json({errorMessage: "Did not update"});
            } else {
                res.status(210).json({id, text});
            }
        })
        .catch(err => {
            console.log(err);
        })
})




server.listen(port, () => console.log(`Server running on port ${port}`));