const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;

    if (!user || !user.name) {
        res.status(400).json({ message: 'A user name is required' });
    } 
    else {
        try {
            const newUser = await db.insert(user);

            if (newUser) {
                res.status(200).json({
                    message: 'User successfully added to database',
                    newUser
                });
            }
        } catch (error) {
            res.status(500).json({
                message:
                    'There was a problem adding a new user to the database',
                error
            });
        }
    }
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
