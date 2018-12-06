const express = require('express');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

const server = express();
const PORT = 5000;

server.use(express.json(), logger('tiny'));

server.delete('/api/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(count => {
            if (count) {
                res.json({message: `Successfully deleted the post with ID: ${req.params.id}`})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"});
        })
});

server.get('/api/posts', (req, res) => {
    postDb.get()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(500).json({error: "The posts information could not be retrieved."});
        });
});

server.get('/api/posts/:id', (req, res) => {
    postDb.get(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(500).json({error: "The post information could not be retrieved."});
        });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.userId && post.text) {
        postDb.insert(post)
            .then(idObject => {
                postDb.get(idObject.id)
                    .then(post => {
                        res.status(201).json(post);
                    })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the post to the database"});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'userId' and 'text' for the post."});
    }
});

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    if (post.userId && post.text) {
        postDb.update(req.params.id, post)
            .then(count => {
                if (count) {
                    postDb.get(req.params.id)
                        .then(post => {
                            res.json(post);
                        })
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The post information could not be modified."});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'userId' and 'text' for the post."});
    }
});

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});