const express = require('express');
const dbUser = require('../data/helpers/userDb.js');

const router = express.Router();

//entry '/api/users'
router.get('/', async (req, res) => {
    try {
        const users = await dbUser.get();
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: "The users could not be retrieved." })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await dbUser.get(id);
        if (!user) {
            res.status(404).json({ error: `There is no user with the id of ${id}` })
        } else {
            res.status(200).json({ user })
        }
    } catch (error) {
        res.status(500).json({ error: "The information could not be retrieved." })
    }
});

//need to add the middleware
router.post('/', async (req, res) => {
    const name = req.body;
    try {
        const new_user_id = await dbUser.insert(name);
        const user = await dbUser.get(new_user_id.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Unable to add name." })
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await dbUser.get(id);
        const userId = await dbUser.remove(id);
        if (userId === 0) {
            res.status(404).json({ error: `There is not user with the id of ${id}` })
        } else {
            res.status(200).json({ message: `${user.name} has been deleted.` });
        }
    } catch (error) {
        res.status(500).json({ error: "things didnt go well" })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = await req.body;
    const count = await dbUser.update(id, changes);
    if (!changes.name) {
        res.status(404).json({ error: "Please be sure to include a name input." })
    } else {
        try {
            if (count === 0) {
                res.status(404).json({ error: `There is no name with the id of ${id}` })
            } else {
                const updated = await dbUser.get(id);
                res.status(200).json({ updated })
            }
        } catch (error) {
            res.status(500).json({ error: "We were unablet to update your name." })
        }
    }
})

module.exports = router;