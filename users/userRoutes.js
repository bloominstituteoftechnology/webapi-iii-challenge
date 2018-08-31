const express = require('express');
const dbUser = require('../data/helpers/userDb.js');
const router = express.Router();

// custom middleware
function uppercased(req, res, next) {
    req.body.upper = req.body.name.toUpperCase();
    // console.log(req.body);
    next();
};

router.use(express.json());

// User routing --------------------------------------------
router.get('/', (req, res) => {
    dbUser.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The users information could not be retrieved.' });
    })
})

router.get('/:id', (req, res) => {
    dbUser.get(req.params.id)
    .then(user => {
        // console.log(user);
        if (!user) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(user);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
});

router.post('/', uppercased, (req, res) => {
    const { name, upper } = req.body;
    const upperCaser = req.body.upper;
    if (!name) {
        res.status(400).json({ errorMessage: 'Please provide a username.' });
        return;
    }
    dbUser.insert({
        name: upperCaser
    })
    .then(response => {
        res.status(201).json(req.body.upper);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the username to the database' });
        return;
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    dbUser.remove(id)
        .then(count => {
            // console.log(count);
            if (count) {
                res.status(203).json({ message: 'User has been deleted'}).end();
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The user could not be removed' }));
});

router.put('/:id', uppercased, (req, res) => {
    const { name } = req.body;
    const upperCaser = req.body.upper;
    if (!name) {
        res.status(400).json({ errorMessage: 'Please provide the new username.' });
        return;
    }
    dbUser.update(req.params.id, {name: upperCaser})
        .then(user => {
            if (user) {
                res.status(200).json(req.body.upper)
                // console.log(req.body);
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
            
        })
        .catch(err => res.status(500).json({ message: 'The user information could not be modified.' }));
});

router.get('/:id/posts', (req, res) => {
    dbUser.getUserPosts(req.params.id)
    .then(userPosts => {
        // console.log(userPosts);
        if (!userPosts) {
            res.status(404).json({ message: 'The user with the specified ID does not have any posts.' });
            return;
        }
        res.status(200).json(userPosts);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
});

module.exports = router;