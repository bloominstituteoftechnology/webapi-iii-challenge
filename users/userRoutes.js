const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

const nameToUpperCase = (req, res, next) => {
    let name = '';
    if (req.body.name) name = req.body.name.toUpperCase();
    if (!req.body.name) name = 'NO NAME';
    if (name.length > 128) name = name.slice(0, 128);
    req.name = name;
    console.log('\x1b[35m', `\n[nameToUpperCase] [${moment().format()}] \"${req.method} ${req.originalUrl} ${req.protocol}} \" - \"Set user\'s name ${req.body.name} to ${name}\"`);
    console.log('\x1b[0m', '');
    next();
};

router.get('/', (req, res) => {
    userDb.get()
        .then(user => {
            res.send(user);
        })
        .catch(err => res.status(500).send({error: `The users information coud not be retrieved. | ${err}`}));
});

router.post('/', nameToUpperCase, (req, res) => {
    const name  = req.name;
    if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
                .then(user => {
                    if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});

                    res.status(201).send(user);
                });
        })
        .catch(err => res.status(500).send({error: `There was an error while saving the user to the database. | ${err}`}));
});

router.put('/:id', nameToUpperCase, (req, res) => {
    const { id } = req.params;
    const  name  = req.name;
    if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

    const newUser = { name };
    userDb.update(id, newUser)
        .then(user => {
            if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});
            res.status(200).json(user);
        })
        .catch(err => res.status(500).send({error: `The user could not be modified. | ${err}`}));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(rmvdUser => {
            if(!rmvdUser) return res.status(404).send({error: `The user with the ID of ${id} does not exist.`});
            res.status(200).json(rmvdUser);
        })
        .catch(err => res.status(500).send({error: `The user could not be removed. | ${err}`}))
})

module.exports = router;