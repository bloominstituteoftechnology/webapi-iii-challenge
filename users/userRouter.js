const express = require('express');

const Users = require("../users/userDb.js")

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    try {
        const user = await Users.get()
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: "Error" })
    }
})

router.post('/:id/posts', validateUserId, validateUser, async (req, res) => {
    const userPost = { ...req.body, user_id: req.params.id };
    try {
        const user = await Posts.insert(userPost);
        res.status(210).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error inserting user posts" })
    }
});

router.get('/', validateUser, async (req, res) => {
    try {
        const user = await Users.get()
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: "Error" })
    }
})
router.get('/:id', validateUserId, async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Error retrieving user post by Id" })
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {

})

router.delete('/:id', validateUserId, async (req, res) => {
    const id = (req.params.id)
    try {
        if (user > 0) {
            res.status(204);
        } else {
            res.status(404).json({ message: "Unable to find user" })
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to delete user" })
    }
});

// router.put('/:id', async (req, res) => {


// });

//custom middleware

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await Users.getById(id);
        if (user) {
            req.user = user;
            next()
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to process request" })
    }
};

async function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "Missing user data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "Missing user name" })
    } else {
        next()
    }
};

function validatePost(req, res, next) {

};

module.exports = router;