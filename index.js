const express = require('express');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();
const port = 9000;

const naming = (req, res, next) => {
    const name = req.params.name.toUpperCase();
    req.name = name;
    next();
}

server.use(logger('combined'), express.json());

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(500).json({error: `The users information coud not be retrieved. | ${err}`}));
});

server.post('/api/user/:name', naming, (req, res) => {
    const name  = req.name;
    console.log(name);
    if ( !name ) return res.status(400).json({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
                .then(user => {
                    if(!user) {
                        return res.status(422).json({error: `User does not exist by that id ${userId}`});
                    }
                    res.status(201).json(user);
                });
        })
        .catch(err => res.status(500).json({error: `There was an error while saving the suer to the database. | ${err}`}));
});

server.listen(port, () => console.log(`\n=== API running on port ${port} ===\n`));