const express = require('express');

const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');


const server = express();

const helmet = require('helmet');
const logger = require('morgan');

const toUpper = (req, res, next) => {
    var userName = req.body.name
    if(userName){
        req.body.name = userName.toUpperCase();
        console.log(userName);
        next();
    } else {
    next();
    }
}
 
server.use(
    express.json(),
    logger('tiny'),
    helmet(),
    toUpper
);

//--------------- CREATE ---------------
// Creates user

server.post('/api/users', toUpper, (req, res) => {
    const user = req.body;
    if (user.name){
        userDb.insert(user)
            .then(user => {
                res.status(201)
                res.json({user})
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'Failed to insert user in DB'})
            })
    } else {
        res.status(400)
            .json({message: "Please add a username"})
    }
})

//--------------- /CREATE ---------------

//--------------- READ -----------------

// Gets all Users

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500)
                .json({error: "The posts information could not be retrieved"})
        })
    
})

// Gets all posts by User

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500)
                .json({error: "The post information could not be retrieved"})
        })
})

//--------------- /READ -----------------

//--------------- UPDATE ----------------

server.put('/api/users/:id', toUpper, (req, res) => {
    const user = req.body;
    const { id } = req.params;

    if(user.name){
        userDb.update(id, user)
            .then(updatedUser => {
                if(updatedUser){
                    res.json(`Successfully updated ${updatedUser} user`)
                } else {
                    res.status(404)
                        .json({message: "User with specified ID does not exist"})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: "The user info could not be modified"})
            })
    } else {
        res
            .status(400)
            .json({message: "Please provide the correct info to update User"})
    }
})

//--------------- /UPDTE ----------------

//--------------- DELETE ----------------

// Delete user

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    userDb.remove(id)
        .then(count => {
            if(count){
                res.json(`Successfully deleted ${count} user`)
            } else {
                res.json({message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "The user could not be removed"})
        })

})

//--------------- /DELETE ---------------

server.listen(4000);