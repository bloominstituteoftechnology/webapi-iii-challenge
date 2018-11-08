const express = require('express');

function nameToUpperCase(req, res, next) {
    const { body } = req;
    if (!body.name.length) {
        res.status(400).json({ message: 'A name is required' })
    }
    req.body.name = body.name.toUpperCase();
    next();
}

module.exports = nameToUpperCase;