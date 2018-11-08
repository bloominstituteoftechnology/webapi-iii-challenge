const express = require('express')
const postDb = require('../data/helpers/postDb.js');
const router = express.Router();


router.get('/:id', (req, res) => {
    const { id } = req.params
    postDb.get(id)
        .then(post => {
                res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: 'The post ID can not be found'})
        })
})

router.get('/tags/:id', (req, res) => {
    const { id } = req.params
    postDb.getPostTags(id)
        .then(post => {
            if(post.length === 0) {
                res.status(404).json({ message: 'invalid tags id' })
            } else {
            res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The posts tags by ID can not be found'})
        })
})

router.post('/', (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ message: 'Please a text body' })
    } else {
        postDb.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            }) 
            .catch(err => {
                res.status(500).json({ message: 'post can not be added at this time'})
            })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
        postDb.remove(id)
            .then(post => {
               if(post) {
                res.status(200).json({ message: `deleted post with id:${req.params.id}` })
               } else {
                res.status(404).json({ message: `user with id:${req.params.id} does not exist` })
               }
            })
            .catch(err => {
                res.status(500).json({ message: 'Error deleting post from database' })
            })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    if (!req.body.text) {
        res.status(400).json({ message: 'Please provide a text body' })
    } else {
        postDb.update(id, req.body)
            .then(post => {
                res.status(201).json(req.body)
            })
            .catch(err => {
                res.status(500).json({ message: 'post can not be updated at this time'})
            })
    }
})




module.exports = router;