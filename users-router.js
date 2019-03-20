const express = require('express');

const Users = require('./data/helpers/userDb.js');
const Posts = require('./data/helpers/postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch (err) {
        console.log(error);
        res.status(500).json({
            error: 'The users information could not be retrieved.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the user'
        });
    }
});

module.exports = router;