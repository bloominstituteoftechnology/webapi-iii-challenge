const express = require('express');
const server = express();
const cors = require('cors');

const postDb = require('./data/helpers/postDb.js')
const tabDb = require('./data/helpers/tagDb.js')
const userDb = require('./data/helpers/userDb.js')



server.use(express.json());
server.use(cors());


const sendServerError = (msg, res) => {
    res.status(500);
    res.json(msg);
    return;
}


server.get('/api/posts', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The posts information could not be retrieved.'})
    });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }
    postDb.get(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'The post information could not be retrieved.'})
    })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;

    if(!post) {
        res.status(400).json({error: 'Please provide content for your post.'})
    }

    postDb.insert(post)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving your post to the database.'})
    })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;

    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist.'})
    }

    postDb.update(id, post) 
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError({error: 'There was an error saving your changes.'})
    })
})

server.listen(8000, () => console.log('API running'))