const express = require('express');
const userDb = require('../helpers/userDb');
const router = express.Router(); 


function userNameCheck(req, res, next){
    let [body] = [req.body]

    if(body.name.charAt(0) !== body.name.charAt(0).toLowerCase()){
        next(); 
    } else {
        res.status(400).json({error: "User Name must be capitalized."})
        }

    if(body.name.length > 128) {
        next(); 
    } else {
        res.status(400).json({error: "User Name cannot be more than 128 characters long."})
        }
}


router.get('/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.get(id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

router.get('/posts/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.getUserPosts(id)
        .then(users => {
            if(users.name)
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user's posts could not be retrieved."})
        })
})

router.post('/', userNameCheck, (req, res) => {
    let [body] = [req.body]
    
    userDb.insert(body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be created."})
        })
})

router.put('/:id', userNameCheck, (req, res) => {
    let [id, body] = [id, req.body]

    userDb.update(id, body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be updated."})
        })
})

router.delete('/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.remove(id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be deleted."})
        })
})

module.exports = router; 

