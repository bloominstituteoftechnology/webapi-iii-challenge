const express = require('express');
const router = express.Router();
const tagDb = require('../../data/helpers/tagDb');

//GET TAGS
router.get('/', (req, res) => {
    tagDb.get()
        .then(postData => {
          
            res.status(200).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The tags could not be retrieved."
            })
        })
});

//NEW TAG
router.post('/', (req, res) => {
    const tag = req.body.tag;
    let newTag = {
        tag
    };
    tagDb.insert(newTag)
        .then(response => {
            res.status(200).json({
                "success": "new tag created",
                "tag": newTag,
                "new_tag_id": response
            })
        })
        .catch(err => {
            res.status(500).json({
                "failed": "new tag was not created",
                "error": err
            })
        })
})

//UPDATE TAG
router.put('/:id', (req, res) => {

    let id = req.params.id;
    let tag = req.body.tag;

    tagDb.update(id, {
            "tag": tag
        }) //?
        .then(response => {

            res.send(tag + ' was updated')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "failed": "tag was not updated",
                "error": err
            })
        })
})

//DELETE TAG
router.delete('/:id', (req, res) => {

    let id = req.params.id;

    tagDb.remove(id) //?
        .then(response => {

            res.send('tag ' + id + ' was removed')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "failed": "tag was not removed",
                "error": err
            })
        })
})

module.exports = router;