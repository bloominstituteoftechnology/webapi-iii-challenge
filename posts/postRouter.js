const express = 'express';

const post = require('./postDb.js');
const user = require('../users/userDb.js');

const router = express.Router();


//ENDPOINTS
router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// CUSTOME MIDDLEWARE

function validatePostId(req, res, next) {

};

module.exports = router;