const express = require('express');

const router = express.Router();

const userDb = require('../helpers/userDb');




router.get('/', (req, res) => {
    userDb.get().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "Nobody is here."})
)
})

router.get('/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be got"})
    });
})

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name)
    res.status(400).json({ errorMessage: "Give a name fool"});
    userDb.insert({ name })
    .then(posts => res.status(201).json({ name}))
    .catch(err => res.status(400).json({ error: "Error Saving User"}))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(req.params.id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({message: "Gone forever"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleteing User"})
    });
})

router.put('/:id', (req, res) => {
    const { name } = req.body;
    if(!name)
    res.status(400).json({ errorMessage: "Provide name please"});
    userDb.update(req.params.id, {name})
    .then(users => {
        if(users.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({name});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

router.get('/:id/posts', (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({message:"ID doesnt exist"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: "User post cant be retrieved"})
    });
})



module.exports = router;