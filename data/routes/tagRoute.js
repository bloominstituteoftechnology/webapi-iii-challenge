const express = require('express');
const router = express.Router();
const tagDb = require('../helpers/tagDb');


// All tags
router.get('/', (req, res) => {
    tagDb
    .get()
    .then(tags => {
        res
        .status(200)
        .json(tags);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tags information could not be retrieved."});
});
});


// tag by id
router.get('/:id', (req, res) => {
    tagDb
    .get(req.params.id)
    .then(tag => {
        if (tag.length === 0) {
            res
            .status(404)
            .json({ message: "The tag with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(tag);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tag information could not be retrieved."});
});
});


//Insert tag
router.post('/', (req, res) => {
    const {tag} = req.body;
    if (!tag) {
        res.status(400).json({errorMessage: "Please provide tag for the post."})
        return;
    }
    tagDb
        .insert({
            tag
        })
        .then(response => {
            res.status(201).json({tag});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the tag to the database" })
        })
});


//Update tag
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {tag} = req.body;
    if (!tag) {
        res.status(400).json({errorMessage: "Please provide tag for the tag."})
        return;
    }
    tagDb
    .update(id, {tag})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The tag with the specified ID does not exist."})
            return;
        }
        res.status(200).json({tag})
    })
    .catch(error => {
        res.status(500).json({error: "The tag information could not be modified."})
        return;
    });
});


//Delete tag
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    tagDb
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The tag with the specified ID does not exist."})
        }
        res
        .json({message:'tag removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The tag could not be removed"})
        })
});

module.exports = router;