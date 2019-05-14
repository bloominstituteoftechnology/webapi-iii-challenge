const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;

    if (!user || !user.name || !Object.keys(user).includes('name')) {
        res.status(400).json({ message: 'A user name is required' });
    } else {
        try {
            const newUser = await db.insert(user);

            if (newUser) {
                res.status(200).json({
                    message: 'User successfully added to database',
                    newUser
                });
            }
        } catch (error) {
            res.status(500).json({
                error: 'There was a problem adding a new user to the database',
                error
            });
        }
    }
});

router.post('/:id/posts', validateUserId,  async (req, res) => {});

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: 'There was a problem returning all users from database'
        });
    }
});

router.get('/:id', validateUserId,  async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await db.getById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'There was an error returning user by id'})
    }

}); //TODO

router.get('/:id/posts', validateUserId, async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    try {
        const newUserPost = await db.getUserPosts(id);

        if (newUserPost) {
            res.status(200).json(newUserPost);
        } else {
            res.status(404).json({
                message: `There was no user with id ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'There was a problem adding a new post to the database',
            error
        });
    }
});

router.delete('/:id', validateUserId,  async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            message: 'User id is required to delete a user'
        }); // TODO: not displaying message
    } else {
        try {
            const removedUser = await db.remove(id);

            if (removedUser) {
                res.status(200).json({
                    message: `User with id of ${id} successfully removed`
                });
            } else {
                res.status(404).json({
                    message: `There was no user with id of ${id}`
                });
            }
        } catch (error) {
            res.status(500).json({
                error: 'There was a problem removing user',
                error
            });
        }
    }
});

router.put('/:id', validateUserId,  async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const userInfo = req.body

    if (!name) {
        res.status(400).json({ message: `A user name is required`})
    }
    else {
        try {
            const updatedUser = await db.update(id, userInfo)
            res.status(200).json({ message: 'User info has been updated'})
        } catch (error) {
            res.status(500).json({ error: `There was a problem updating the user`})
        }
    }
});

//custom middleware

async function validateUserId(req, res, next) {
    const { id } = req.params
    try {
        const user = await db.getById(id)
        if (user) {
            req.user = user
        }
        else {
            res.status(400).json({ message: "invalid user id" })
        }
    } catch (error) {
        res.status(500).json({ error: 'There was an error validating user by id'})
    }
    next()
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
