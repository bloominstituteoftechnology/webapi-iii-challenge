const express = require('express');
const userdb = require('../data/helpers/userDb');
const userRoutes = express.Router();

// Make username inputs capitalized
const allCapsName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

// Make id a Number
const makeNumber = (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
}


/*****************************************/
/*** USER METHODS ***/
/*****************************************/
// Get All Users
userRoutes.get('/', (req, res) => {
    userdb.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        return res.status(500).json({message: "Error getting users data."});
    })
})

// Get single user
userRoutes.get('/:id', (req, res) => {
    const {id} = req.params;
    userdb.get(id)
    .then(user => {
        if(!user){
            return res.status(404).json({message: `User with ID ${id} does not exist.`})
        }
        return res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: `The user request could not be finished.`})
    })
})

// Get all posts from userID
userRoutes.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    console.log(id);
    userdb.getUserPosts(parseInt(id))
    .then(userPosts => {
        console.log(userPosts);
        if(userPosts.length === 0){
            return res.status(404).json({message: `The user with ID ${id} has no posts.`})
        } else {
        return res.status(200).json(userPosts);
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'The request failed.'})
    })
})


// Create new user with name in all caps
userRoutes.post('/', allCapsName, (req, res) => {
    const name = req.body;
    if(!name){
        res.status(400).json({message: "You must input a name."})
    }

    userdb.insert(name)
    .then(id => {
        const newUserID = id.id; 
        return userdb.get(newUserID)
        .then(user => {
            if(!user){
                return res.status(404).json({message: `The new user with ID ${newUserID} does not exist.`})
            }
            return res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: "Error adding new user."})
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error adding new user."})
    } )
})


// Delete user
userRoutes.delete('/:id', makeNumber, (req, res) => {
    const {id} = req.params;

    userdb.remove(parseInt(id))
    .then(reply => {
        if(!reply){
            return res.status(404).json({message: `The user with ID ${id} does not exist.`})
        }
        return res.status(200).json({message: `User ${id} successfully deleted.`});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: `Error deleting user with ID ${id}`})
    })
})

// Edit user method

userRoutes.put('/:id', (req, res) => {
    const {id} = req.params;
    const newName = req.body;

    userdb.update(parseInt(id), newName)
    .then(user => {
        if(!user){
            return res.status(404).json({message: `The user with ID ${id} does not exist.`})
        }
        return userdb.get(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({message: `The user with ID ${id} could not be found.`})
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: 'Error updating user.'})
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'Error updating user.'})
    })
})

module.exports = userRoutes;