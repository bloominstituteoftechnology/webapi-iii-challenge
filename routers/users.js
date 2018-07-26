const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb');

// custom errors
const errors = {
    400: 'Please provide information with your request.',
    403: 'Balance is the key, making things even is the secret to success.',
    404: 'The specified ID does not exist.',
    500: 'The information could not be accessed or modified.'
}

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        res.status(403).json({error: errors["403"]});
    }
}

// READ
router.get('/', async (req, res) => {
    try {
        const users = await userDb.get();

        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

router.get('/:id/userPosts', async (req, res) => {
    try {
        const {id} = req.params;
        const userPosts = await userDb.getUserPosts(id);

        if(userPosts.length > 0) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// CREATE
router.post('/', isEven, async (req, res) => {
    try {
        const user = {...req.body};

        if(user.name) {
            const newUser = await userDb.insert(user);

            res.status(201).json(user);
        } else {
            res.status(400).json({error: errors["400"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = req.body;
        let findUser = await userDb.get(id);

        if(findUser && (user.name)) {
            const updateUser = await userDb.update(id, user);
            findUser = await userDb.get(id);

            res.status(200).json(findUser);
        } else if (!findUser) {
            res.status(404).json({error: errors["404"]});
        } else {
            res.status(400).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            const delUser = await userDb.remove(id);

            res.status(200).json(user);
        } else {
            res.status(404).json({error: errors["404"]});
        }
    } catch(err) {
        res.status(500).json({error: errors["500"]});
    }
});

module.exports = router;
