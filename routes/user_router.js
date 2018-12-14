const express = require('express');
const router = express.Router();

const db = require('../data/helpers/userDb.js')

//middleware only applicable to users
router.use((req, res, next) => {
    //insert logic here if you want middleware
    next();
});

//If you pass an id to db.get() it will return the resource with that id if found.
// /api/users
router.get('/', (req, res) => {
    db.get()                          //userDb.js has get() method, see ReadME
    .then((users) => {
        res.json(users);
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Users information could not be retrieved."})
    });
});


// /api/users/:id
router.get('/:id', (req, res) => {
    const {id} = req.params;     //define user id
    db.getUserPosts(id)         //getUserPosts takes in user id as argument
    .then((user) => {
        if(user){
            res.json(user);
        } else {
            res 
            .status(404)
            .json({message: "The user with the specified ID cannot be found."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "User's posts could not be retrieved."})
    })
})


// /api/users
router.post('/', (req, res) => {
    const user = req.body;
    console.log('users from body', user)

    if (user.name) {

        db.insert(user).then(idInfo => {
            db.get(idInfo.id).then(user => {   //pass id into get()
                res.status(201).json(user);
            });
        }).catch(err => {
            res 
            .status(500)
            .json({message: "failed to insert user in database"})
        });

    } else {
        //added layer of assurance that a more specific error message is provided
        res.status(400).json({message: "status 400: missing user name"})
    }
});


// /api/users/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(count => {   //doc says remove() returns 'number' of users (resources) deleted
        if (count) {
            res.json({message: "successfully deleted user"});
        } else {
            res 
                .status(404)
                .json({message: "invalid id"});
        }
    }).catch(err => {
        res 
            .status(500)
            .json({message: "fail to delete user"});
    })
})



// /api/users/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;
    //combination of GET, POST, DELETE
    if (user.name) {

    db.update(id, user)   //accepts two arguments, id of resource to update & object with changes to apply
    .then(count => {
        if (count) {
            //200 successfully updated (send back updated user)
            db.get(id).then(user => {
                res.json(user);
            });
        } else {
            //404 invalid id
            res 
            .status(404)
            .json({message: "invalid id"});
        }
    })
    .catch(err => {
        //500 catch-all, something else went wrong
        res 
        .status(500)
        .json({message: 'something went wrong, fail to update user'})
    })

    } else {
        //400 error name is missing
        res.status(400).json({message: "status 400: missing user name"})
    }
});

module.exports = router;