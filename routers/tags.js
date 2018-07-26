const express = require('express');
const router = express.Router();
const tagDb = require('../data/helpers/tagDb');

// custom errors
const errors = {
    400: 'Please provide information with your request.',
    403: 'Balance is the key, making things even is the secret to success.',
    404: 'The specified ID does not exist.',
    500: 'The information could not be accessed or modified.'
}

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        res.status(403).json({error: errors["403"]});
    }
}

// READ
router.get('/', async (req, res) => {
    try {
        const tags = await tagDb.get();

        res.status(200).json(tags);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// CREATE
router.post('/', isEven, async (req, res) => {
    try {
        const tag = {...req.body};

        if(tag.tag) {
            const newTag = await tagDb.insert(tag);

            res.status(201).json(tag);
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = req.body;
        let findTag = await tagDb.get(id);

        if(findTag && (tag.tag)) {
            const updateTag = await tagDb.update(id, tag);
            findTag = await tagDb.get(id);

            res.status(200).json(findTag);
        } else if (!findTag) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            const delTag = await tagDb.remove(id);

            res.status(200).json(tag);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

module.exports = router;
