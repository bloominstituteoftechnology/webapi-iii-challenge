const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    userDb.get()
       .then(users => res.json(users))
       .catch(err =>
       res.status(500)
       .json({error: "The users info could not be retrieved."}))
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    userDb.get(id)
       .then((user) => {
           if (user) {
               res.json(user);
           } else {
               res.status(400)
               .json({message: "The user with this id does not exist."})
           }
           res.json(user);
       })
       .catch(err =>
           res.status(500)
           .json({ error: "The user info could not be retrieved."})
           )
})

module.exports = router;