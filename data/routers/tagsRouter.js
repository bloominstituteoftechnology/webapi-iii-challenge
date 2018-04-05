const express = require('express');

const router = express.Router();

const tagDb = require('../helpers/tagDb.js');

router.get('/', (req, res) => {
    tagDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    tagDb.get(id)
    .then( response => {
        if (response)
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No tag with that Id'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});


router.post('/', (req, res) => {
    const tag = req.body;
    if (tag.tag && tag.tag.length < 80) {
        tagDb.insert(tag)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({error: 'Tag must have tag property that is less that 80 characters.'});
    }
});

router.put('/:id', (req, res) => {
    const tag = req.body;
    const { id } = req.params;
    
    tagDb.update(id, tag)
    .then(response => {
        if (response === 1)
            res.status(200).json(id);
        else
            res.status(404).json({error: 'No tag with that id.'})
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tagDb.remove(id)
    .then(response => {
        if (response === 1)
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No tag with that Id.'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});


module.exports = router;