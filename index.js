const express = require('express');
const helmet = require('helmet');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json());
server.use(helmet());


//userDB.js

//USERS.GET
server.get('/users', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    userDb.get(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})


//USERS.GETUSERPOSTS
server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.getUserPosts(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})


//USERS.PUT
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    
    userDb.update(id, { name }).then(posts => {
        res.status(200).json(posts);

    })
    .catch(err => res.send(err));
})

//USERS.POST
server.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name ) {
        res.status(400).json(`{ errorMessage: "Please provide a name for the post." }`)
    };

    let msg = db.find()[db.find()-1];

    userDb.insert({ name }).then(posts => {
        posts.push({ name });
        res.status(201).json(`{Message: "Success"}`);
    })
    .catch(err => res.send(err));
})

//USERS.DELETE
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.remove(id).then(posts => {
        res.status(204).json(posts);
    })
    .catch(err => res.send(err));
})


//tagDb.js

//TAG.GET
server.get('/tags', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    tagDb.get(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})


//TAG.PUT
server.put('/tags/:id', (req, res) => {
    const id = req.params.id;
    const { tag } = req.body;
    
    tagDb.update(id, { tag }).then(posts => {
        res.status(200).json(posts);

    })
    .catch(err => res.send(err));
})

//TAG.POST
server.post('/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag ) {
        res.status(400).json(`{ errorMessage: "Please provide tag for the post." }`)
    };

    let msg = tagDb.find()[tagDb.find()-1];

    tagDb.insert({ tag }).then(posts => {
        posts.push({ tag });
        res.status(201).json(`{Message: "Success"}`);
    })
    .catch(err => res.send(err));
})

//TAG.DELETE
server.delete('/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb.remove(id).then(posts => {
        res.status(204).json(posts);
    })
    .catch(err => res.send(err));
})

//postDb.js

//POST.GET
server.get('/posts', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    postDb.get(id).then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.getPostTags(id).then(tags => {
        res.status(200).json(tags);
    })
    .catch(err => res.send(err));
})

//POST.PUT
server.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const { text, userId } = req.body;
    
    postDb.update(id, { text, userId }).then(posts => {
        res.status(200).json(posts);

    })
    .catch(err => res.send(err));
})

//POST.POST
server.post('/posts', (req, res) => {
    const { text, userId } = req.body;
    if (!text || !userId ) {
        res.status(400).json(`{ errorMessage: "Please provide a text and user ID for the post." }`)
    };

    let msg = db.find()[db.find()-1];

    postDb.insert({ text, userId }).then(posts => {
        posts.push({ text, userId });
        res.status(201).json(`{Message: "Success"}`);
    })
    .catch(err => res.send(err));
})

//POST.DELETE
server.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb.remove(id).then(posts => {
        res.status(204).json(posts);
    })
    .catch(err => res.send(err));
})

server.listen(8000, () => console.log(`\n=== API running... ===\n`));