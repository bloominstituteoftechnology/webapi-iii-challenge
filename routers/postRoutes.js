const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');
const userDb = require('../data/helpers/userDb');

router.use(express.json());


// C - Create
router.post('/:userId/post', async (req, res) => {
    const userId = req.params.userId;
    let user = null;
    let users = await userDb.get();

    const newNote = req.body;

    users.map(u => {
        if (u.id == userId) {
            user = u;
            newNote.userId = userId;
        }
    });

    try {
        if (!user) {
            res
                .status(404)
                .json({
                    errorMessage: 'The new note must be attached to an existing user'
                });
        } else if (!newNote.text || newNote.text === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'The new note needs to have some type of text'
                });
        } else {
            let response = await db.insert(newNote);
            newNote.id = response.id;

            response ?
                res
                    .status(201)
                    .json(newNote)
                :
                res
                    .status(500)
                    .json({
                        errorMessage: 'An error occurred while attempting to save the post'
                    });
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

// Ra - ReadAll
router.get('/', async (req, res) => {
    try {
        const posts = await db.get();

        posts.length > 0 ?
            res
                .status(200)
                .json(posts)
            :
            res
                .status(404)
                .json({
                    errorMessage: "No posts found at this time. Try again Later please."
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'An unknown error occured. Please try again'
            });
    }

    res
        .status(200)
        .send('Welcome to Posts');
});

// R1 - ReadOne
router.get('/:postId', async (req, res) => {
    const id = req.params.postId;

    try {
        let post = await db.get(id);

        post ?
            res
                .status(200)
                .json(post)
            :
            res
                .status(404)
                .json({
                    errorMessage: `There is no post with the corresponding id of ${id}`
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }

    res
        .status(200)
        .json({
            url: `/posts/${id}`,
            operation: `GET to Post with id ${id}`
        });
});

// U - Update
router.put('/:postId', async (req, res) => {
    const id = req.params.postId;
    const updatedPost = req.body;

    try {
        let post = await db.get(id);

        if (!updatedPost.text || updatedUser.text === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'INCOMPLETE: Please attach text to this post.'
                })
        } else if (!post) {
            res
                .status(404)
                .json({
                    errorMessage: `No post was found with the id of ${id}`
                });
        } else {
            await db.update(id, updatedPost);
            res
                .status(200)
                .json(updatedPost);
        }

    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// D - Destroy
router.delete('/:postId', async (req, res) => {
    const id = req.params.postId;
    let post = await db.get(id);

    try {
        if (!post) {
            res
                .status(404)
                .json({
                    errorMessage: `No user was found with the id of ${id}`
                });
        } else {
            const response = await db.remove(id);
            const posts = await db.get();

            response ?
                res
                .status(200)
                .json(posts) :
                res
                .status(500)
                .json({
                    errorMessage: 'There was a problem deleting the record'
                });

        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            });
    }
});

module.exports = router;