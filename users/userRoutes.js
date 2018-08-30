const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

// Custom middleware to uppercase user's name
function upperCase(req, res, next) {
    req.upperName = req.body.name.toUpperCase();
    next();
}

router.post('/', upperCase, (req, res) => {
    const { name } = req.body;
    const upperName = req.upperName;
    if (!name) {
        res.status(400).json({errorMessage: 'Please provide a name for this user.'});
    } else {
        userDb.insert({name: upperName})
            .then(() => {
                res.status(201);
                res.json({upperName});
            })
            .catch(err => {
                next(err);
                // res.status(500).json({error: 'There was an error while saving this user to the database.'});
            })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await userDb.get();
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
        // res.status(500).json({errorMessage: 'Error while getting the data.'});
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await userDb.get(id);
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
        // res.status(500).json({errorMessage: 'Error while getting the data.'});
    }
})

router.get('/:id/posts', (req, res) => {
    const id = req.params.id;
    userDb.getUserPosts(id)
        .then(posts => {
            if (posts.length > 0) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({errorMessage: 'A user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            next(err);
            // res.status(500).json({errorMessage: 'There was an error getting this user\'s posts.'});
        })
})

router.put('/:id', upperCase, (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const upperName = req.upperName;
    if (!name) {
        res.status(400).json({errorMessage: 'Please provide a new name for this user.'});
    } else {
        userDb.update(id, {name: upperName})
            .then(count => {
                if(count === 1) {
                    res.status(201).json(count);
                } else {
                    res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});
                }
            })
            .catch(err => {
                next(err);
                // res.status(500).json({errorMessage: 'There was an error updating this user\'s info.'});
            })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userDb.remove(id)
        .then(count => {
            if (count === 1) {
                res.status(204).end();
            } else {
                res.status(404).json({errosMessage: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            next(err);
            // res.status(500).json({errorMessage: 'The user could not be removed.'});
        })
})

module.exports = router;