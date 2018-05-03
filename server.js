const express = require('express');
const bodyParser = require('body-parser');
const dbUsr = require('./data/helpers/userDb');
const dbPst = require('./data/helpers/postDb');
const dbTg = require('./data/helpers/tagDb');
//const db = require('./data/dbConfig');

const server = express();
server.use(bodyParser.json());


server.get('/', (req, res) => {
    res.send('Api Running');
});

// get list of all users
server.get('/api/users', (req, res) => {
    dbUsr.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//get list of all posts by a user
server.get('/api/users/:id/posts', (req, res) => {
    const id = req.params.id;
    dbUsr.getUserPosts(id).then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//create a new user
server.post('/api/users/new', (req, res) => {
    const { name } = req.body
    const user = { name: name };
    dbUsr.insert(user).then(
        res.status(200).json("creation success")
    ).catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
});

//delete a user
server.delete('/api/users/:id/delete', (req, res) => {
    const id = req.params.id;
    dbUsr.remove(id).then(user => {
        res.json("deleted");
    }).catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    })
});

//update a user
server.put('/api/users/:id/update', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const user = { name: name };
    dbUsr.update(id, user).then(
        res.status(200).json("update success")
    ).catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
});

//get list of all tags
server.get('/api/tags', (req, res) => {
    dbTg.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//create a new tag
server.post('/api/tags/new', (req, res) => {
    const { tag } = req.body
    const tags = { tag: tag };
    dbTg.insert(tags).then(
        res.status(200).json("creation success")
    ).catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
});

//delete a tag
server.delete('/api/tags/:id/delete', (req, res) => {
    const id = req.params.id;
    dbTg.remove(id).then(tag => {
        res.json("deleted");
    }).catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    })
});

//update a tag
server.put('/api/tags/:id/update', (req, res) => {
    const id = req.params.id;
    const { tag } = req.body;
    const tags = { tag: tag };
    dbTg.update(id, tags).then(
        res.status(200).json("update success")
    ).catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
});

//get list of all posts
server.get('/api/posts', (req, res) => {
    dbPst.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//get list of all tags on a
server.get('/api/posts/:id/', (req, res) => {
    const id = req.params.id;
    dbPst.getPostTags(id).then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});




server.listen(666, () => console.log('\n==API Running on port 666\n'));