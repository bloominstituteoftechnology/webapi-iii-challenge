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

router.post('/', (req, res) => {
    const user = req.body;

    if (user.name) {
        userDb.insert(user).then(idReturn => {
            userDb.get(idReturn.id).then(user => {
                res.status(201).json(user);
            });
        }) .catch(err => {
            res.status(500)
            .json({error: "Error occured when saving user to database"})
        });
    } else {
        res.status(400).json({error: "Please provide name."})
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    userDb.remove(id).then(count => {
        if (count) {
            res.json({message: "Successfully Delete Item"})
        }else {
            res.status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
    } 

    ).catch(err => {
        res.status(500)
        .json({error: "The user could not be removed"})
    } )
})

router.put('/:id', (req, res) => {
    const user = req.body;
    const {id} = req.params;

    if (user.name){
        userDb.update(id, user)
        .then(count => {
            if (count) {
                userDb.get(id).then(user => {
                    res.json(user);
                })
            }else {
                res.status(404).json({error: `The user with the specified ${ID} does not exist.`})
            }
        })
        .catch(err => {
            res.status(500)
            .json({error: "The user information could not be modified."})
        })

    }else {
        res.status(400).json({error: "Please provide name for user."})
    }
})

module.exports = router;