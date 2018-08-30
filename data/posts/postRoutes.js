const express = require('express');
const postDb = require('../helpers/userDb');
const router = express.Router(); 


function postCreateCheck(req, res, next){
    let [body] = [req.body]

    if(body.text) {
        next(); 
    } else {
        res.status(400).json({error: "Text is a required property with a value as string and no size limit."})
        }

    if(!body.id){
        next(); 
    } else {
        res.status(400).json({error: "No Id required."})
        } 

    if(body.userId){
        next(); 
    } else {
        res.status(400).json({error: "userId is a required property and must be the id of an existing user."})
        } 
}

function postUpdateCheck(req, res, next){
    let [body] = [req.body]

    if(body.userId){
        next(); 
    } else {
        res.status(400).json({error: "userId is a required property and must be the id of an existing user."})
        } 
}


router.get('/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.get(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

router.get('/tags/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.getPostTags(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post's tags could not be retrieved."})
        })
})


router.post('/', postCreateCheck, (req, res) => {
    let body = req.body

    postDb.insert(body)
        .then(posts => { 
            res.status(201).json(posts.id); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be created."})
        })
})


router.put('/:id', postUpdateCheck, (req, res) => {
    let [id, body] = [id, req.body]

    postDb.update(id, body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated."})
        })
})

router.delete('/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.remove(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be deleted."})
        })
})

module.exports = router; 