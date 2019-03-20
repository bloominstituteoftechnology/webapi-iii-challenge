const express = require('express');

const Posts = require('./data/helpers/postDb');

const Postrouter = express.Router();

Postrouter.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch (err) {
        console.log(error);
        res.status(500).json({
            error: 'The posts information could not be retrieved.'
        });
    }
});

Postrouter.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'The post information could not be retrieved.'});
    }
});

// Postrouter.post('/', async (req, res) => {
//     const post = await Posts.insert(req.body);
//     console.log(post);
//     if (post.text) {
//         try {
//             res.status(201).json(post);
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({ error: 'There was an error while saving the post to the database'});
//         }
//     } else {
//         res.status(400).json({
//             errorMessage: 'Plese provide text for the post.'
//         });
//     }
// });

Postrouter.post('/', (req, res) => {
    const newPost = req.body;
    console.log(newPost);

    if(newPost.text) {
        Posts.insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database '})
        });
    } else {
        res.status(400).json({ errorMessage: 'Please provide the name for the post'})
    }
});

module.exports = Postrouter