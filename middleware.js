const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');
const server = express();
const NUM = 4444;


const UPPERCASE = (req,res,next) => {
    const name = req.body.name

    if (name) {
        req.body.name = name.toUpperCase()
    }
    next()
}

module.exports = {
    UPPERCASE: UPPERCASE
}