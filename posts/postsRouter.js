const express = require('express');

const dbu = require('../data/helpers/userDb.js');

const dbp = require('../data/helpers/postDb.js');

const router = express.Router();


//middleware


//endpoints when url begins
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    dbu.getUserPosts(id)
    .then(u =>{
        res.status(200).json({"posts": u})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.get('/', (req, res) => {
    dbp.get()
    .then(p =>{
        res.status(200).json({"posts": p})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    dbp.get(id)
    .then(u =>{
        res.status(200).json({"posts": u})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    const newPost = req.body;
    if(newPost.text && newPost.userId){
        dbp.insert(newPost)
        .then(p => {
            res.status(201).json(p);
        })
        .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: 'error' })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    dbp.remove(id)
    .then(removal => {
        res.status(200).json(removal)
    })
    .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    dbp.update(id, changes)
        .then(updated => {
            if (!updated){
                res.status(400).json({ message: "The post with the specified ID does not exist " })
            } else {
                res.status(200).json(updated)
            }
        })
})

module.exports = router;