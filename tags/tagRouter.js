const express = require("express");
const router = express.Router();
const tagDb = require("../data/helpers/tagDb.js")

router.get('/', (req, res) => {
    tagDb.get().then(tags => {
        res.json(tags);
    }).catch(err => {
        res.status(500).json({
            error: "The tags could not be found"
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    tagDb.get(id).then(tag => {
        if(tag.length > 0) {
            res.json(tag);
        } else {
            res.status(404).json({
                message: "Tags not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: "The specified tags for the user could not be found"
        })
    })
})


router.post('/', (req, res) => {
    tag = req.body;
    tagDb.insert(tag).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: "There was en error creating a new tag to the database"
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const tagUpdate = req.body;

    tagDb.update(id, tagUpdate).then(response => {
        res.status(200).json({
            Sucess: "Tag has been updated"
        })
    }).catch(err => {
        res.status(500).json({
            error: "Tag update failed"
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    tagDb.remove(id).then(response => {
        res.status(200).json({
            Deleted: "Tag has been deleted from the database"
        })
    })
})




module.exports = router;