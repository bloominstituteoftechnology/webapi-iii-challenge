const express = require('express');
const helmet = require('helmet');

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

const port = 8000;
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})
// ***** user start *****
server.get('/api/users', (req, res) => {
    users.get().then(u => {
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved'})
    })
});
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.get(id).then(u => {
        if(u.length === 0) {
            res.status(404).json({ error: 'The user with specified ID does not exist.' });
        }
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    })
});
server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    users.getUserPosts(id).then(u => {
        if(u.length === 0) {
            res.status(404).json({ error: 'The user with specified ID does not exist.' });
        }
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    })
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({ error: 'Please provide user name.' });
        res.end(); // <-- needed or not?
    }
    users.insert({ name }).then(u => {
        res.status(201).json(u);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the user to the database.' })
    })
});
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id).then(u => {
        if(!u) {
            res.status(404).json({ error: 'The user with the specified ID does not exist.' })
        }
        res.status(200).json(u);
    })
    .catch(err => {
        res.status(500).json({ error: 'The user could not be removed.' })
    })
})
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users.update(id, { name }).then(u => {
        if(!name) {
            res.status(400).json({ error: 'Please provide user name' })
        } else if(!u) {
            res.status(404).json({ error: 'The user with specified ID does not exist' })
        } else {
            res.status(200).json(u);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The user information could not be modified' })
    })
})
// ***** user end *******

// ***** post start *****
server.get('/api/posts', (req, res) => {
    posts.get().then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved'})
    })
});
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts.get(id).then(p => {
        if(p.length === 0) {
            res.status(404).json({ error: 'The post with specified ID does not exist.' });
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    })
});
server.get('/api/posts/:id/tags', (req, res) => {
    const { id } = req.params;
    posts.getPostTags(id).then(p => {
        if(p.length === 0) {
            res.status(404).json({ error: 'The list of tags with specified post ID does not exist.' });
        }
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: 'The post tags information could not be retrieved.'})
    })
});
server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if(!text || ! userId){
        res.status(400).json({ error: 'Please provide text and userId.' });
        res.end(); // <-- needed or not?
    }
    posts.insert({ text, userId }).then(p => {
        res.status(201).json(p);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' })
    })
});
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts.remove(id).then(p => {
        if(!p) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        res.status(200).json(p);
    })
    .catch(err => {
        res.status(500).json({ error: 'The post could not be removed.' })
    })
})
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    posts.update(id, { text, userId }).then(p => {
        if(!text || !userId) {
            res.status(400).json({ error: 'Please provide post name' })
        } else if(!p) {
            res.status(404).json({ error: 'The post with specified ID does not exist' })
        } else {
            res.status(200).json(p);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The post information could not be modified' })
    })
})
// ***** post end *******

// ***** tag start ******
server.get('/api/tags', (req, res) => {
    tags.get().then(u => {
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The tags information could not be retrieved'})
    })
});
server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags.get(id).then(u => {
        if(!u) {
            res.status(404).json({ error: 'The tag with specified ID does not exist.' });
        }
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The tag information could not be retrieved.'})
    })
});

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if(!tag){
        res.status(400).json({ error: 'Please provide tag.' });
        res.end(); // <-- needed or not?
    }
    tags.insert({ tag }).then(u => {
        res.status(201).json(u);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the tag to the database.' })
    })
});
server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags.remove(id).then(u => {
        if(!u) {
            res.status(404).json({ error: 'The tag with the specified ID does not exist.' })
        }
        res.status(200).json(u);
    })
    .catch(err => {
        res.status(500).json({ error: 'The tag could not be removed.' })
    })
})
server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    tags.update(id, { tag }).then(u => {
        if(!tag) {
            res.status(400).json({ error: 'Please provide tag name' })
        } else if(!u) {
            res.status(404).json({ error: 'The tag with specified ID does not exist' })
        } else {
            res.status(200).json(u);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The tag information could not be modified' })
    })
})
// ***** tag end *******

server.listen(port, () => console.log(`Server is listening on port ${port}`))