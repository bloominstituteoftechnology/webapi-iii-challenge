const express = require('express');
const users = require('../../data/helpers/userDb');
const errorHandler = require('../errorHandler');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { name } = req.body;
    if (!name) next({ code: 400, errorMessage: "Please provide a name for the user." });
    if (name.length > 128) next({ code: 400, errorMessage: "Name provided is too long!" });;
    try {
        const response = await users.insert({ name });
        return res.status(201).json(response);
    } catch (err) {
        if (err.errno === 19) next({ code: 400, errorMessage: 'There is already an existing user with that name!' });
        next({ code: 500, error: 'There was an error while saving the user to the database.' });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await users.get();
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The users information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const response = await users.get(req.params.id);
        if (!response) next({ code: 404, message: "The user with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The user information could not be retrieved.' });
    }
})

router.get('/posts/:id', async (req, res, next) => {
    try {
        const response = await users.getUserPosts(req.params.id);
        if (response.length === 0) next({ code: 404, message: 'This user has no posts!' });
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The user information could not be retrieved.' });
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) next({ code: 400, errorMessage: "Please provide a name for the user." });
    if (name.length > 128) next({ code: 400, errorMessage: "Name provided is too long!" });;
    try {
        const updateResponse = await users.update(id, { name });
        if (updateResponse === 0) next({ code: 404, message: 'The user with the specified ID does not exist.' });
        try {
            const findResponse = await users.get(id);
            if (!findResponse) next({ code: 404, message: "The user with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            next({ code: 500, error: 'The user information could not be retrieved.' });
        }
    } catch (err) {
        next({ code: 500, error: "The users information could not be modified." });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const findResponse = await users.get(req.params.id);
        if (!findResponse) next({ code: 404, message: "The user with the specified ID does not exist." });
        try {
            const removeResponse = await users.remove(req.params.id);
            if (removeResponse === 0) next({ code: 404, message: "The user with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            next({ code: 500, error: "The user could not be removed" });
        }
    } catch (err) {
        next({ code: 500, error: "The user information could not be retrieved." });
    }
})

router.use(errorHandler.errorHandler);

module.exports = router;
