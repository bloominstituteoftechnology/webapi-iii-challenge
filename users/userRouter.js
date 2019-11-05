const express = require('express');
const User = require('./userDb.js');

const router = express.Router();

const middleware = [
    validatePost,
    validateUser,
    validateUserId
];

router.use(middleware);



router.post('/', (req, res) => {

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
    const { id } = req.params;
    User.getById(id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: 'invalid user id' });
            };
        })
        .catch(err => {
            res.status(500).json({ message: 'couldnt retrieve user' });
        });
};

function validateUser(req, res, next) {
    const { name } = req.body;

    if(!req.body) {
        res.status(400).json({ message: 'missing user data' });
    } else if(!name) {
        res.status(400).json({ message: 'missing require name field' });
    } else {
        next();
    }

};

function validatePost(req, res, next) {
    
};

module.exports = router;
