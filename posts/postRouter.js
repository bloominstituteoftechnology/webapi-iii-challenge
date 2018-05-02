const express = require("express");
const router = express.Router();
const postDb = require("../data/helpers/postDb.js")

router.get('/', (req, res) => {
    postDb.get().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({
            error: "The post information could not be found"
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    postDb.get(id).then(post => {
        res.json(post);
    }).catch(err => {
        error: "The specified post could not be found"
    })
})

router.get('/:id/tags', (req, res) => {
    const id = req.params.id;
    postDb.getPostTags(id).then(tags => {
        res.json(tags);
    }).catch(err => {
        error: "The specified post could not be found"
    })
})

router.post('/', (req, res) => {
    newPost = req.body;
    postDb.insert(newPost).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: "There was en error creating a new post to the database"
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postUpdate = req.body;

    postDb.update(id, postUpdate).then(response => {
        res.status(200).json({
            Sucess: "Post has been updated"
        })
    }).catch(err => {
        res.status(500).json({
            error: "Post update failed"
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    postDb.remove(id).then(response => {
        res.status(200).json({
            Deleted: "Post has been deleted from the database"
        })
    })
})





module.exports = router;