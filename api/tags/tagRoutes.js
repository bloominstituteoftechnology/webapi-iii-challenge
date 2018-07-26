const express = require('express');
const tags = require('../../data/helpers/tagDb');

const router = express.Router();

function tagUpperCaser(req, res, next) {
    if (req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }
    next();
}

router.post('/', tagUpperCaser, async (req, res) => {
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    if (tag.length > 80) return res.status(400).json({ errorMessage: "Tag provided is too long!" });
    try {
        try {
            const response = await tags.insert({ tag });
            return res.status(201).json(response);
        } catch (err) {
            if (err.errno === 19) return res.status(500).json({ error: 'There is already an existing tag with that name!' });
            return res.status(500).json({ error: 'There was an error while saving the tag to the database.' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'The tags information could not be retrieved.' });
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await tags.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The tags information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await tags.get(req.params.id);
        if (!response) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The tag information could not be retrieved.' });
    }
})

router.put('/:id', tagUpperCaser, async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    try {
        const updateResponse = await tags.update(id, { tag });
        if (updateResponse === 0) return res.status(404).json({ message: 'The tag with the specified ID does not exist.' });
        try {
            const findResponse = await tags.get(id);
            if (!findResponse) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: 'The tag information could not be retrieved.' });
        }
    } catch (err) {
        if (err.errno === 19) return res.status(500).json({ error: 'There is already an existing tag with that name!' });
        return res.status(500).json({ error: "The tags information could not be modified." });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const findResponse = await tags.get(req.params.id);
        if (!findResponse) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
        try {
            const removeResponse = await tags.remove(req.params.id);
            if (removeResponse === 0) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: "The tag could not be removed" });
        }
    } catch (err) {
        return res.status(500).json({ error: "The tag information could not be retrieved." });
    }
})

module.exports = router;