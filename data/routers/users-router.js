const express = require('express');
const router = express.Router();

const UserFuncs = require('../helpers/userDb.js')

router.get('/', async (req, res) => {
    const users = await UserFuncs.get();
    try {
        res.status(200).json(users)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error retrieving users"})
    }
});

router.get('/:id', async (req, res) => {
    const user = await UserFuncs.getById(req.params.id);
    if(user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    try {
        res.status(200).json(user)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error retrieving user"})
    }
});

function capitalizeName(req, res, next) {
  req.body.name = req.body.name.toLowerCase();
  req.body.name = (req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1))
  next();
  }

router.post('/', capitalizeName, async (req, res) => {
    try {
        const user = await UserFuncs.insert(req.body);
        if (!user.name) {
            return res.status(400).json({ errorMessage: "Please provide name for the user." })
        } else {
            res.status(201).json(user)
        }

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            errorMessage: "Please provide title and contents for the post."
    })
    }
});

router.delete('/:id', async (req, res) => {
    const user = await UserFuncs.remove(req.params.id)
    try {
        if (user > 0) {
            res.status(200).json({ message: "This user has been deleted"})
        } else {
            res.status(404).json({ message: "Could not find user with this ID."})
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error deleting the user."})
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ errorMessage: "Please provide a name for the user." })
        }
        const user = await UserFuncs.update(req.params.id, req.body)

        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'This user could not be found.'})
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Error updating the user' })
    }
});

module.exports = router;