const userDB = require('../data/helpers/userDb.js');
const express = require('express');
const router = express.Router();

//MIDDLEWARE
function upperCase(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
};

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
    userDB.get(parseInt(req.params.id))
    .then(user => {
        if( user.length === 0) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        else {
            res.status(200).json(user);
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

router.get('/:id/posts', (req, res) => {
    userDB.getUserPosts(req.params.id)
    .then(userPosts => {
        if( userPosts.length === 0) {
            res.status(404).json({ error: 'The posts with the specified ID do not exist.' })
        }
        else {
            res.status(200).json({userPosts});
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.post('/', upperCase, async (req, res) => {
    const user = req.body;
    if (user.name) {
        try {
            const response = await userDB.insert(user);
            res.status(201).json({ message: "Added new user!"});
        } 
        catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the post to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});

router.put('/:id', upperCase, (req, res) => {
    userDB.update(req.params.id, req.body)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: "Update failed." }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params; // the same as const id = req.params.id but destructuring the code
    userDB.remove(id)
        .then(count => {
            console.log('count: ', count);
            if(count) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: 'No user with this id was found.' });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;