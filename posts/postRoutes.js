//Posts Routes
const express = require('express');
const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

// GET all users
router.get('/', (req, res) => {
    postDb.get().then(posts => {
        console.log(posts);
        res.status(200).json(posts);
     })
    .catch(error => res.status(500).send({ error: "The posts information could not be retrived."}));
});

// GET user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id).then(post => {
        if(post.length === 0) {
            return res.status(404).send({ message: "The user with the specified id does not exist." });
        }
        res.status(200).json(post);
    })
    .catch(error => res.status(500).send({ error: "The user information could not be retrieved." }));
});

// //Post new user
router.post('/', (req, res) => {
    const { text, userId } = req.body;
    const newPost = { text, userId };
    postDb.insert(newPost).then(postId =>
        res.status(200).json(newPost)
    )
    .catch(error => {
        if(!text) {
            return res.status(400).send({ errorMessage: "Please provide text to create a new post." });
        } else if(!post) {
            res.status(422).send({ Error: `There is no post by this id ${userId}`});
        } else {
            res.status(500).send({ error: "There was an error while saving the new post to the database." });
        }
    })
})

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id).then(deletedPost => {
        if(!deletedPost) {
            return res.status(404).send({ Error: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "You successfully deleted the post." });
        }
    })
    .catch(error => res.status(500).send({ error: "The post failed to delete." }));
 });

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    userDb.update(id, newUser).then(user => {
        console.log(user);
        if(!name) {
            res.status(400).send({ errorMessage: "Please provide a name for the post." })
        } else if (!user) {
            res.status(404).send({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(req.body);
        }})
        .catch(error => res.status(500).send({ error: "Post information could not be modified."}))
    });

    module.exports = router;