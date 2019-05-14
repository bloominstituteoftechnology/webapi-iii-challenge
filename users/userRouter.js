const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', async (req, res) => {
    // try {
    //     const user = req.body
    //     const newUser = await db.insert(user)

    //     if (!user.name) {
    //         res.status(403).json({ message: 'a user name is required'})
    //     }
    //     if (newUser) {
    //         res.status(200).json({ message: 'User successfully added to database', newUser})
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'There was a problem adding a new user to the database', error })
    // }
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
