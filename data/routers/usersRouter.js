const express = require('express');

const router = express.Router();

const userDb = require('../helpers/userDb.js');

router.get('/', (req, res) => {
    userDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDb.get(id)
    .then( response => {
        if (response)
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No user with that Id'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:userId/posts', (req, res) => {
    const { userId } = req.params;
    userDb.getUserPosts(userId)
    .then(response => {
        if (response[0])
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No user with that Id'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/', (req, res) => {
    const user = req.body;
    if (user.name && user.name.length < 129) {
        userDb.insert(user)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({error: 'User must have a name that is no more than 128 characters.'});
    }
});

router.put('/:id', (req, res) => {
    const user = req.body;
    const { id } = req.params;
    
    userDb.update(id, user)
    .then(response => {
        if (response === 1)
            res.status(200).json(id);
        else
            res.status(404).json({error: 'No user with that id.'})
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
    .then(response => {
        if (response === 1)
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No user with that Id.'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});


module.exports = router;