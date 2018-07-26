const express = require('express');

const userDb = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', async (req, res) => { // GET user
    try {
        const users = await userDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The users information could not be retrieved.' })
    };
});

router.get('/:id', async (req, res) => { // GET user/:id
    const {id} = req.params;
    try {
        const user = await userDb.get(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve user.' })
    }
})

router.post('/', async (req, res) => { // POST user
    if (!req.body || !req.body.name)
        res.status(400).json({ message: 'Please provide name and bio for the user.'})
    const { name } = req.body
    try {
        const { id } = await userDb.insert({ name })
        if (id) {
            res.status(200).json({ id, name })
        }
    } catch (error) {
        res.status(500).json({ error: 'User could not be added.' })
    }
})

router.put('/:id', async (req, res) => { // PUT user/:id
    if (!req.body || !req.body.name)
        res.status(400).json({ error: 'Please provide name and bio for the user.'})
    const { name } = req.body
    try {
        const usedID = await userDb.update(req.params.id, { name });
        if (userID > 0)
            res.status(200).json({ id, name })
    } catch (error) {
        res.status(500).json({ error: 'Unable to update user.' })
    }
})

router.delete('/:id', async (req, res) => { // DELETE user/:id
    try {
        const result = await userDb.remove(req.params.id)
        if (result > 0)
            res.status(200).json({ message: 'User has been successfully delete.' })
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete user.' })
    }
})

module.exports = router;