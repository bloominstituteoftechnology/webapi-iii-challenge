const express = require('express');
const userDB = require('../data/helpers/userDb');
const middleware = require('../custom_middleware');


const router = express.Router();

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve users." })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDB.getUserPosts(id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404)
            .json({ message: "There are no posts by this user ID." })
        }})
        .catch(err => {
            res.status(500).json({ error: "Unable to retrieve posts." })
        })
})

router.post('/', middleware.uppercase, (req, res) => {
    const user = req.body;
    if (user.name && user.name.length < 129) {
    userDB.insert(user)
    .then(info => {
        userDB.getUserPosts(info)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404)
            .json({ message: "There are no posts by this user ID." })
        }})
    }).catch(err => {
        res.status(500).json({ error: "There was an error while saving this user to the database"})
    })
    } else {
        res.status(400).json({errorMessage: "Please provide a user name between 1 and 128 charaters in length."})
    }
});

router.delete('/:id', (req,res) => {  
    const {id} = req.params;
    userDB.remove(id)
    .then(resolution => {
        res.json({ message: "Successfully Deleted" })
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
});

router.put('/:id', middleware.uppercase, (req, res) => {
    const {id} = req.params;
    const user = req.body;
    if (user.name && user.name .length < 129) {
    userDB.update(id, user)
    .then (success => {
        res.status(200).json({ message: "Update Successful" })
    })
    .catch(err => {
        res.status(500).json({ error: "User could not be modified." });
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide a user name between 1 and 128 charaters in length." })
    }
});

module.exports = router;