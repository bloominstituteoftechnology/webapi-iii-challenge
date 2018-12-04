// create an express server
const express = require('express'); //inside package.json dependencies
const helmet = require('helmet');
const logger = require('morgan');

const db = require('./data/helpers/userDb.js')


// manage persistence of users and posts data


const server = express();
const PORT = 6000;

// middleware
server.use(
    express.json(),
    logger('dev'),
    helmet(),

);

// route handlers - users

// this is simply to make sure the server is working
// server.get('/entrance', (req, res) => {
//     res.status(404).json({message: 'request receive, welcome Paul 2!', id: null, name: 'Paul Hans'});
// });


//If you pass an id to db.get() it will return the resource with that id if found.
server.get('/api/users', (req, res) => {
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

server.post('/api/users', (req, res) => {
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

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(count => {   //doc says remove() returns 'number' of users deleted
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



// listen
server.listen(PORT, err => {
    console.log(`server is up and running on ${PORT}`);
})