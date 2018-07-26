const userDb = require('../data/helpers/userDb');
const express = require('express');

const router = express.Router();

//endpoint for GET users
router.get('/', async (req, res, next) => {
    try {
        const response = await userDb.get();
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Users information could not be retrieved.', error: error.message})
    }
})

//endpoint for GET user with id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await userDb.get(id);

        if (!response) {
            return next({ success: false, code: 404, message: "The user with the specified ID does not exist.", error: null})
        }

        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Users information could not be retrieved.', error: error.message})
    }
})

//endpoint for GET userposts
router.get('/:id/posts', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await userDb.getUserPosts(id);
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Users information could not be retrieved.', error: error.message})
    }
})

//endpoint for DELETE user
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await userDb.get(id);
        if (!user) {
            return next({ success: false, code: 404, message: "The user with the specified ID does not exist.", error: null})
        }

        await userDb.remove(id);
        res.status(200).json(user);
    } catch (errore) {
        next({ success: false, code: 500, message: "The user could not be removed.", error: error.message})
    }
})

//endpoint for PUT user
router.put('/:id', async (req, res, next) => {
    if (!req.body.name) {
        return next({ message: 'Please provide name of user.' })
    }

    const id = req.params.id;
    const user = req.body;
    try {
        const response = await userDb.update(id, user);
        if (response===0) {
            next({ success: false, code: 404, message: "The user with the specified ID does not exist.", error: null})
        } else {
            const newUser = await userDb.get(id);
            res.status(200).json(newUser);
        }
    } catch (error) {
        next({ success: false, code: 500, message: "This user could not be modified.", error: error.message})
    }
})

module.exports = router;