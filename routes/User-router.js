const express = require('express');
const router = express.Router();

const Users = require('../data/helpers/userDb');
const Posts = require('../data/helpers/postDb');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the user!'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the user!'});
    }
});

// POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST
router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.name === '') {
        res.status(400).json({message:'Please provide valid username'})
    }
    try {
        const user = await Users.insert({name: req.body.name});
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the user!'});
    }
})




const error = {
    name: 'wrong name!!'
}

module.exports = router;
