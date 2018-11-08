const express = require('express');
const postDB = require("../data/helpers/postDb");
const userDB = require("../data/helpers/userDb.js");

const router = express.Router();

// middleware

// endpoints

router.get("/", (req, res) => {
    postDB.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts could not be retrieved." },
                console.log(err))
        })
})

router.post("/", (req, res) => {
    try {
        const postData = req.body;
        if (postData.text === "" || postData.text === undefined) {
            res.status(400).json({ error: "Please enter a post." })
        }
        else if (postData.userId) {
            userDB.get(postData.userId).then(post => {if (post === undefined) {
                res.status(400).json({ error: "The user ID you entered does not correspond to a user." })
            } else {
                const newPost = postDB.insert(postData);
                res.status(201).json(postData);
            }
            })
        }
    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const post = req.body;

    postDB.update(id, post)
        .then(count => {
            if (post.text === "" || post.text === undefined) {
                res.status(400).json({ errorMessage: "Please provide text for the post." });
            }
            else if (post.userId === "" || post.userId === undefined) {
                res.status(400).json({ errorMessage: "Please provide a user ID for the post." });
            }
            else if(count) {
                res.status(200).json(post);
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    postDB.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(count);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

module.exports = router;