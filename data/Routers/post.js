const express = require('express');

const router = express.Router()

const db = require('../helpers/postDb');

router.get('/', (req, res)=> {

    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting posts ", error))
    })

})

router.get('/:id', (req, res)=> {
    const { id } = req.params;

    db.get(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting post ", error))
    })
})


router.get('/:id/tags', (req, res)=> {
    const { id } = req.params;

    db.getPostTags(id)
    .then(tags => {
        res.status(200).json(tags)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error getting tags ", error))
    })
})

router.post('/add', (req, res) => {
    const post = req.body

    db.insert(post)
    .then(post=> {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error posting post ", error))
    })
})

router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const post = req.body

    db.update(id, post)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error updating post", error))
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(error => {
        res.status(500).json(console.error( "Error deleting post", error))
    })
})

module.exports = router;
