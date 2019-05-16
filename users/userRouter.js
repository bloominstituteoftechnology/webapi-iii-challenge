const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    const user = req.body;

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
});

//TODO: Implement new db method to add posts to users
// router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
//     const { id } = req.params
//     const { post } = req.body

//     try {
        
//     } catch (error) {
        
//     }
// });

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: 'There was a problem getting all users from database'
        });
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await db.getById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: 'There was an error returning user by id'
        });
    }
});

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
            error: 'There was a problem getting all posts from user',
            error
        });
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    const { id } = req.params;

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
});

router.put('/:id', validateUserId, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userInfo = req.body;

    if (!name) {
        res.status(400).json({ message: `A user name is required` });
    } else {
        try {
            const updatedUser = await db.update(id, userInfo);
            res.status(200).json({ message: 'User info has been updated' });
        } catch (error) {
            res.status(500).json({
                error: `There was a problem updating the user`
            });
        }
    }
});

//custom middleware
async function validateUserId(req, res, next) {
    const { id } = req.params;
    try {
        const user = await db.getById(id);
        if (user) {
            req.user = user;
        } else {
            res.status(400).json({ message: 'invalid user id' });
        }
    } catch (error) {
        res.status(500).json({
            error: 'There was an error validating user by id'
        });
    }
    next();
}

function validateUser(req, res, next) {
    const { body } = req;
    const { name } = req.body;

    if (Object.entries(body).length === 0) {
        res.status(400).json({
            message: 'missing user data'
        });
    } //Todo: not displaying message when body is missing
    if (!name) {
        res.status(400).json({
            message: 'missing required name field'
        });
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    const { body } = req;
    const { text } = req.body;

    if (Object.entries(body).length === 0) {
        res.status(400).json({
            message: 'missing post data'
        });
    } //Todo: not displaying message when body is missing
    if (!text) {
        res.status(400).json({
            message: 'missing required text field'
        });
    } else {
        next();
    }
}

module.exports = router;
