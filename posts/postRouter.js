const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});


router.post('/', (req, res) => {
    insert({user_id, text})
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;

// localhostXXX.com/users/:id/posts/:id
// localhostXXX.com/users/
// localhostXXX.com/posts/