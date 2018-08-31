const express = require('express');
const dbPost = require('../data/helpers/postDb.js');
const dbUser = require('../data/helpers/userDb.js');
const router = express.Router();

// custom middleware
function validUserId(req, res, next) {
    const { userId } = req.body;
    dbUser.get(userId)
    .then(user => {
        console.log(user);
        if (!user) {
            res.status(404).json({ message: 'The user with the specified ID does not exist. Please enter a valid userId and try again.' });
            return;
        } else {
            next();
        }
    })
};

router.use(express.json());

// Posts routing ---------------------------------------------
router.get('/', (req, res) => {
    dbPost.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    })
})

router.get('/:id', (req, res) => {
    dbPost.get(req.params.id)
    .then(post => {
        // console.log(user);
        if (!post) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(post);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
});

router.post('/', validUserId, (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) {
        res.status(400).json({ errorMessage: 'Please provide a valid userId and post text.' });
        return;
    }
    dbPost.insert({
        text,
        userId
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the post to the database' });
        return;
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    dbPost.remove(id)
        .then(count => {
            console.log(count);
            if (count) {
                console.log('this ran');
                res.status(200).json({ message: 'Post has been deleted'});
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The post could not be removed' }));
});

router.put('/:id', (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: 'Please provide the new post content.' });
        return;
    }
    dbPost.update(req.params.id, req.body)
        .then(post => {
            // console.log(post);
            if (post) {
                res.status(200).json(req.body)
                // console.log(req.body);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
            
        })
        .catch(err => res.status(500).json({ message: 'The post information could not be modified.' }));
});

module.exports = router;