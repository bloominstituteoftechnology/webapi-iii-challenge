const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.originalUrl);
    postDb.get()
        .then(post => {
            res.send(post);
        })
        .catch(err => res.status(500).send({error: `The post information coud not be retrieved. | ${err}`}));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
        .then(post => {
            if(!post) return res.status(422).send({error: `Post does not exist by that id ${id}`});
            res.send(post);
        })
        .catch(err => res.status(500).send({error: `The post information coud not be retrieved. | ${err}`}));
});

// server.post('/api/users/', nameToUpperCase, (req, res) => {
//     const name  = req.name;
//     if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

//     const newUser = { name };
//     userDb.insert(newUser)
//         .then(userId => {
//             const { id } = userId;
//             userDb.get(id)
//                 .then(user => {
//                     if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});

//                     res.status(201).send(user);
//                 });
//         })
//         .catch(err => res.status(500).send({error: `There was an error while saving the user to the database. | ${err}`}));
// });

// server.put('/api/users/:id', nameToUpperCase, (req, res) => {
//     const { id } = req.params;
//     const  name  = req.name;
//     if ( !name ) return res.status(400).send({error: 'Please provide a name for the user.'});

//     const newUser = { name };
//     userDb.update(id, newUser)
//         .then(user => {
//             if(!user) return res.status(422).send({error: `User does not exist by that id ${userId}`});
//             res.status(200).json(user);
//         })
//         .catch(err => res.status(500).send({error: `The user could not be modified. | ${err}`}));
// });

// server.delete('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.remove(id)
//         .then(rmvdUser => {
//             if(!rmvdUser) return res.status(404).send({error: `The user with the ID of ${id} does not exist.`});
//             res.status(200).json(rmvdUser);
//         })
//         .catch(err => res.status(500).send({error: `The user could not be removed. | ${err}`}))
// })

module.exports = router;