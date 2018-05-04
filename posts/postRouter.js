const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb.js");

// GET/Request Data from Server
router.get("/", (req, res) => {
    db
        .get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ message: "There was a problem getting data from the server." });
    });
});

// GET/Request Specific Post
router.get("/:id", (req, res) => {
    db
        .get(req.params.id)
        .then(post => {
            console.log(post);
            if (post.length >= 1) {
                res.json(post);
            } else {
                res.status(404).json({ message: "There is no post with that ID." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "There was a problem getting data from the server." });
        });
});

// GET/Request Post Tags
router.get("/:postId/tags", (req, res) => {
    db
        .getPostTags(req.params.postId)
        .then(tags => {
            if (tags.length > 0) {
                res.json(tags);
            } else {
                res.status(404).json({ message: "There is no post with that ID." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "There was a problem getting data from the server." });
        });
});

// POST/Create New Post
router.post("/", (req, res) => {
    db
        .insert(req.body)
        .then(postId => {
            const { id } = postId;
                db.get(id).then(post => {
                res.json(post);
                });
        })
        .catch(error => {
            res.status(500).json({ message: "There was a problem posting to the server." });
        });
});

// DELETE/Remove Post
router.delete("/:postId", (req, res) => {
    db
        .remove(req.params.postId)
        .then(num => {
            if (num < 1) {
                res.status(404).json({ message: "There was no post with that id." });
            } else {
            res.json({ message: "Post successfully deleted." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "There was a problem deleting the post." });
        });
});

// PUT/Updating Post
router.put("/:postId", (req, res) => {
    db
        .update(req.params.postId, req.body)
        .then(count => {
            if (count < 1) {
                res.status(404).json({ message: "There was no post with that ID." });
            } else {
                db.get(req.params.postId).then(post => {
                    res.json(post);
                });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error updating the post." });
        });
});

module.exports = router;