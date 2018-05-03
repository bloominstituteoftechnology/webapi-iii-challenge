// import node modules
const express = require('express');
const db = require('../data/helpers/userDb');
const router = express.Router();


//GET (retrieve user) //Postman test ok: http://localhost:5000/api/users 
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    //If there's an error in retrieving the user from the database
    .catch(err => {
        res.status(500).json({ errorMsg: 'User Info could not be found.' })
    });
});

//GET (retrieve user by id) //Postman test ok: http://localhost:5000/api/users/2
router.get('/:id', (req, res) => {
    const id = req.params.id; 
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ errorMsg: 'The specified UserID does not exist.' })
        } else {
            res.json(posts);
        }
    })
    //If there's an error in retrieving the user from the database
    .catch(err => {
        res.status(500).json({ errorMsg: 'User Info could not be found.' })
    });
});

//POST (add user) //Postman test ok: http://localhost:5000/api/users (added Froto Puggins, id 10)
router.post('/', (req, res) => {
    const {name} = req.body;
    const newPost = {name};
        if ((name.length === 0) || name.length > 128) {
            res.status(404).json({ errorMsg: 'User with specified userID does not exist or is greater than 128 characters.' })
        } else 
        db
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        //If there's an error in retrieving the user from the database
        .catch(err => {
            res.status(500).json({ errorMsg: 'Error saving user to database.' })
        });
});
    
//DELETE (delete user) //Postman test ok: http://localhost:5000/api/users/11 (userID 11 removed)
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ errorMsg: 'User with specified userID does not exist.' })
    } else
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    //If there's an error in retrieving the user from the database
    .catch(err => {
        res.status(500).json({ errorMsg: 'Sorry, User could not be removed.' })
    });
});
    
//PUT (update user) //Postman test ok: http://localhost:5000/api/users/10 (name modified to FROTO PUGGINS PUGGINGTON)
router.put('/:id', (req, res) => {
    const {name} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ errorMsg: 'User with the specified userID does not exist.' })
    } 
    if (name.length === 0 || name.length > 128) {
        res.status(400).json({ errorMsg: 'Please provide userId and text.' })
    } else 
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    //If there's an error in retrieving the user from the database
    .catch(err => {
        res.status(500).json({ errorMsg: 'User info could not be modified' })
    });
});
    

//module export
module.exports = router;