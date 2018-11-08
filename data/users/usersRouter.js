const express = require("express");
const router = express.Router();
const userDb = require("../helpers/userDb");
const upperCaseUser = require("../middleware/upperCaseUsers");

router.get('/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: 'users cannot be retrieved', error: error });
        });
})

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.get(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'user does not exist' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'user cannot be retrieved', error: error });
        })
})

router.post('/users', upperCaseUser, (req, res) => {
    if (req.body.name) {
        userDb.insert(req.body)
            .then(user => {
                res.status(201).json(user.id);
            })
            .catch(error => {
                res.status(500).json({ error: 'user cannot be added', error: error })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide a name' })
    }
})

router.put('/users/:id', upperCaseUser, (req, res) => {
    const id = req.params.id;
    if (req.body.name) {
        userDb.update(id, req.body)
            .then(count => {
                if (count === 1) {
                    res.status(200).json({ message: 'The user has been updated' })
                } else {
                    res.status(404).json({ message: 'The user does not exist' })
                }
            })
            .catch(error => {
                res.status(500).json({ error: "The user information could not be modified.", 'error': error });
            })
    } else {
        res.status(400).json({ message: "Please provide name" })
    }
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then(count => {
            if (count === 1) {
                res.status(200).json({ message: 'the user has been deleted' });
            } else {
                res.status(404).json({ message: 'the user does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'the user cannot be deleted', error: error })
        })
})
router.get('/posts/user/:id', (req, res) => {
    const id = req.params.id;

    userDb.getUserPosts(id)
        .then(posts => {
            if (posts.length > 0) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ message: 'the user has no posts' })
            }
        })
})

module.exports = router;
