const dbUser = require('../data/helpers/userDb');

const express = require('express');

const router = express.Router();

// CUSTOM MIDDLEWARE
const uppercaseName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();

    next();
}

// CRUD operations
router.get('/', (req, res) => {
    dbUser.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'The users cannot be retrieved.'});
        });
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await dbUser.get(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err });
    } 

});

router.post('/', uppercaseName, async (req, res) => {
    try {
        const userData = req.body;
        const insertedId = await dbUser.insert(userData);
        res.status(201).json(insertedId);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCount = await dbUser.remove(id);
        res.status(200).json(`Users deleted: ${deleteCount}`);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.put('/:id', uppercaseName, async (req, res) => {
    try {
        const userData = req.body;
        const { id } = req.params;
        const updateCount = await dbUser.update(id, userData);
        res.status(200).json(`Users updated: ${updateCount}`);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

// get user posts
router.get('/userId/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('req.params', req.params);
        console.log('userId',userId);
        const posts = await dbUser.getUserPosts(userId);
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ message: err});
    }
});

module.exports = router;