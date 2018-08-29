const express = require('express');
const uppercaseMiddle = require('./upperCaseMiddle');
const userDB = require('./data/helpers/userDb');

const server = express();
server.use(express.json());
server.user(uppercaseMiddle.uppercase);


server.get('/users', async (req, res) => {
    try {
        const results = await userDB.get();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
});


server.get('/users/:id', async (req, res) => {
    if (!Number(req.params.id)) {
        res.status(400).json({ message: 'Please enter a number' });
    }
    try {
        const results = await userDB.get(Number(req.params.id));
        if (results) {
            res.status(200).json(results);
        }
        res.status(500).json({ message: 'Your Id is invalid' });
    } catch (err) {
        res.status(500).json(err);
    }
});



