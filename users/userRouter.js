const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
console.log('get users')
res.send('get to /users/');

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
function auth(req, res, next) {
    if (req.url === '/mellon') {
      next();
    } else {
      res.send('You shall not pass!');
    }
  }
  
function validateUserId(req, res, next) {

    console.log('validateUserId',getById(req.id))
next()
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
