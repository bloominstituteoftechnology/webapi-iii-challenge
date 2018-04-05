const express = require('express');

const db = require('../data/helpers/userDb.js');

const router = express.Router();

//endpoint for /api/users

//GET REQUEST
router.get('/', (req,res) => {

    db
        .get()
        .then(users => {
            res 
                .status(200)
                .json(users)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The users could not be retrieved' })
        });
});

router.get('/:id', (req,res) => {
    const { id } = req.params;

    db
        .get(id)
        .then(users => {
            res 
                .status(200)
                .json(users)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The users could not be retrieved' })
        });
});

//GET DELETE

router.delete('/:id', (req,res) => {
    const { id } = req.params;

    db 
        .remove(id)
            .then(user => {
                if (user > 0) {
                    res 
                        .status(200)
                        .json({ message: 'User deleted successfully!'})
                } else {
                    res
                        .status(404)
                        .json({error: 'User not found'})
                }})
            .catch(error => {
                res 
                    .status(500)
                    .json({ error: 'The users could not be retrieved' })
            });
});

//GET POST

router.post('/', (req,res) => {
    let user = req.body;

    if (!user.name) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name!' })
            return;
    } 
    if (user.name.length > 128) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name thats shorter than 128 characters!' })
            return;
    }
    
    db  
        .insert(user)
        .then(id => {
            res
                .status(201)
                .json(user)
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The new users could not be retrieved' });
        });

    // res.json({q:2});
});

//GET PUT

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const updatedUser = req.body

    if (!updatedUser.name) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name!' });
            return;
    } 
    if (updatedUser.name.length > 128) {
        res 
            .status(400)
            .json({ errorMessage: 'Please provide a name thats shorter than 128 characters!' });
            return;
    }

    db  
        .update(id, updatedUser)
        .then(updates => {
            res 
                .status(200)
                .json({ message: `User name was updated to ${updatedUser.name}`});
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: 'The new users could not be retrieved' })
        });
        // res.json({q:2});
});

// GET REQUEST
router.get('/:id/posts/:userId', (req, res) => {
    const { id, userId } = req.params;
    if (id !== userId) {
        res.status(404).json({ error: 'Id or UserId invalid' });
    }

    db
    .get(id)
    .then(response => {
        const { id, name } = response;
        // res.status(200).json({ response: `id is valid for ${name}` });
        db
        .getUserPosts(userId)
        .then(userPosts => {
            res.status(200).json(userPosts);
        })
        .catch(error => {
            res.status(404).json({ errorMessage: 'No posts found for this user.' });
        });
    })
    .catch(error => {
        res.status(500).json({ error: 'The user could not be retrieved' })
    });
})


module.exports = router;