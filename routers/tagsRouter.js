const express = require('express');
const router = express.Router();
const tagDb = require('../data/helpers/tagDb');
const isEven = require('./middleware/isEven');
const isUpper = require('./middleware/isUpper');

// READ
router.get('/', async (req, res, next) => {
    try {
        const tags = await tagDb.get();

        res.status(200).json(tags);
    } catch(err) {
        next({code: 500});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            res.status(200).json(tag);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

// CREATE
router.post('/', isEven, isUpper, async (req, res, next) => {
    try {
        const tag = {...req.body};

        if(!tag.tag) {
            next({code: 400});
        } else {
            const newTag = await tagDb.insert(tag);

            res.status(201).json(tag);
        }
    } catch(err) {
        next({code: 500});
    }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const tag = req.body;
        let findTag = await tagDb.get(id);

        if(findTag && (tag.tag)) {
            const updateTag = await tagDb.update(id, tag);
            findTag = await tagDb.get(id);

            res.status(200).json(findTag);
        } else if (!findTag) {
            next({code: 404});
        } else {
            next({code: 400});
        }
    } catch(err) {
        next({code: 500});
    }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const tag = await tagDb.get(id);

        if(tag) {
            const delTag = await tagDb.remove(id);

            res.status(200).json(tag);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

module.exports = router;
