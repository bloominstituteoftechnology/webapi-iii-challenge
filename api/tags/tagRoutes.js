const express = require('express');
const tags = require('../../data/helpers/tagDb');
const errorHandler = require('../errorHandler');

const router = express.Router();

function tagUpperCaser(req, res, next) {
    if (req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }
    next();
}

router.post('/', tagUpperCaser, async (req, res, next) => {
    const { tag } = req.body;
    if (!tag) next({ code: 400, errorMessage: "Please provide a tag." });
    if (tag.length > 80) next({ code: 400, errorMessage: "Tag provided is too long!" });
    try {
        try {
            const response = await tags.insert({ tag });
            return res.status(201).json(response);
        } catch (err) {
            if (err.errno === 19) next({ code: 500, error: 'There is already an existing tag with that name!' });
            next({ code: 500, error: 'There was an error while saving the tag to the database.' });
        }
    } catch (err) {
        next({ code: 500, error: 'The tags information could not be retrieved.' });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await tags.get();
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The tags information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const response = await tags.get(req.params.id);
        if (!response) next({ code: 404, message: "The tag with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The tag information could not be retrieved.' });
    }
})

router.put('/:id', tagUpperCaser, async (req, res, next) => {
    const { id } = req.params;
    const { tag } = req.body;
    if (!tag) next({ code: 400, errorMessage: "Please provide a tag." });
    try {
        const updateResponse = await tags.update(id, { tag });
        if (updateResponse === 0) next({ code: 404, message: 'The tag with the specified ID does not exist.' });
        try {
            const findResponse = await tags.get(id);
            if (!findResponse) next({ code: 404, message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            next({ code: 500, error: 'The tag information could not be retrieved.' });
        }
    } catch (err) {
        if (err.errno === 19) next({ code: 400, errorMessage: 'There is already an existing tag with that name!' });
        next({ code: 500, error: "The tags information could not be modified." });
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const findResponse = await tags.get(req.params.id);
        if (!findResponse) next({ code: 404, message: "The tag with the specified ID does not exist." });
        try {
            const removeResponse = await tags.remove(req.params.id);
            if (removeResponse === 0) next({ code: 404, message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            next({ code: 500, error: "The tag could not be removed" });
        }
    } catch (err) {
        next({ code: 500, error: "The tag information could not be retrieved." });
    }
})

router.use(errorHandler.errorHandler);

module.exports = router;