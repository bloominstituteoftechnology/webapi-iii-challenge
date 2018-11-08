const express = require('express');

const userDb = require('../data/helpers/userDb');
const upperCase = require('../middleware/upperCase')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDb.get(id)
        
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await userDb.getUserPosts(id)
        
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.post('/', upperCase, async (req, res) => {
    try {
        const { body } = req;
        const userId = await userDb.insert(body)
        res.status(201).json(userId);
    } catch(error) {
        error.errno === 19 ?
            res.status(406).json('User name already exists')
            :res.status(500).json(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await userDb.remove(id);
        
        count
            ? res.status(200).json({message: `${count} user's deleted`})
            : res.status(404).json({message: 'User not found'})
    } catch(error) {
        res.status.apply(500).json(error);
    }
})

router.put('/edit/:id', upperCase, async (req, res) => {
    try {
        const { id } = req.params;
        const count = await userDb.update(id, req.body);

        count
            ? res.status(200).json({message: `${count} user's edited`})
            : res.status(404).json({message: 'User not found'})

    } catch(error) {
        res.status.apply(500).json(error);
    }
})


module.exports = router;
