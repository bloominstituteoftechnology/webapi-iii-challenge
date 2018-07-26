const express = require('express');

const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

router.get('/tags', async (req, res) => {  // GET tag
    try {
        const users = await tagDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The tags information could not be retrieved.' })
    };
});

module.exports = router;