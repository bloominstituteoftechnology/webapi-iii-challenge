const express = require('express');

const tagging = express.Router();

const tagDb = require('../helpers/tagDb');




tagging.get('/', (req, res) => {
    tagDb.get().then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json({ error: "Tag, you are it"})
)
})

tagging.get('/:id', (req, res) => {
    tagDb.get(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({ error: "Tag info could not be got"})
    });
})

tagging.post('/', (req, res) => {
    const { tag } = req.body;
    if (!tag)
    res.status(400).json({ errorMessage: "Give me a tag fool"});
    tagDb.insert({ tag })
    .then(posts => res.status(201).json({tag}))
    .catch(err => res.status(400).json({ error: "Error Saving tag"}))
})

tagging.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({message: "That ID dont exist"});
        }
        res.status(200).json({message: "Gone forever no turning back now"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleting tag"})
    });
})

tagging.put('/:id', (req, res) => {
    const { tag } = req.body;
    if(!tag)
    res.status(400).json({ errorMessage: "Provide tag please"});
    tagDb.update(req.params.id, {tag})
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({tag});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})



module.exports = tagging;