const express = require('express');
const router = express.Router();

const users = require('../data/helpers/userDb');

router.post('/', (req, res) => {
    const {name} = req.body;
    if(!name){
        res.status(401).json({message:"could not add name"})
    }
    else if(name.length > 128){
        res.status(401).json({message:"name must be less then 128 characters"})
    }
    users.insert({name})
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(500).json({message:"error posting"})
    })
})

router.get('/', (req, res) => {
    users.get()
    .then(getUser => {
        res.status(200).json(getUser);
    })
    .catch (err => {
        res.status(500).json({message: "user not found"})
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    users.getUserPosts(id)
    .then(user => {
        if(user[0]){
            res.json(user);
        }
        else {
            res.status(404).json({message:"user does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message:"user could not be retrieved"})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    users.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "success"});
        } else {
            res.status(404).json({message:"could not delete"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"user could not be retrieved"})
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if(name){
        users.update(id, {name})
        .then(name => {
            if (name) {
                users.getUserPosts(id)
                .then(name => {
                    res.json(name);
                });
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'user could not be retrieved'});
        });
}});

module.exports = router;