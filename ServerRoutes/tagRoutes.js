const tagDb = require('../data/helpers/tagDb.js');
const express = require('express');

const router = express.Router();

//endpoint for GET tags
router.get('/', async (req, res, next) => {
    try {
        const response = await tagDb.get();
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Tags information could not be retrieved.', error: error.message})
    }
})

//endpoint for GET tags with id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await tagDb.get(id);

        if (!response) {
            return next({ success: false, code: 404, message: "The tag with the specified ID does not exist.", error: null})
        }

        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Tags information could not be retrieved.', error: error.message})
    }
})

//endpoint for POST tag
router.post('/', async (req, res, next) => {
    if (!req.body.tag) {
        return next({ message: "Please provide tag name." })
    }

    try {
        const response = await tagDb.insert(req.body);
        const newTag = await tagDb.get(response.id);
        res.status(200).json(newTag);
    } catch (error) {
        next({ success: false, code: 500, message: "There was an error while saving tag to the database", error: error.message})
    }
})

//endpoint for DELETE tag
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const tag = await tagDb.get(id);
        if (!tag) {
            return next({ success: false, code: 404, message: "The tag with the specified ID does not exist.", error: null})
        }

        await userDb.remove(id);
        res.status(200).json(tag);
    } catch (errore) {
        next({ success: false, code: 500, message: "The tag could not be removed.", error: error.message})
    }
})

// endpoint for PUT tag
router.put('/:id', async (req, res, next) => {
    if (!req.body.tag) {
        return next({ message: "Please provide tag name." })
    }

    const id = req.params.id;
    const tag = req.body;
    try {
        const response = await tagDb.update(id, tag);
        if (response===0) {
            return next({ success: false, code: 404, message: "The tag with the specified ID does not exist.", error: null})
        } else {
            const newTag = await tagDb.get(id);
            res.status(200).json(newTag);
        }
    } catch (error) {
        next({ success: false, code: 500, message: "This tag could not be modified.", error: error.message})
    }
})

module.exports = router;