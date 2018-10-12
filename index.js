const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

// middleware

// express.json() teaches express to parse json info from req.body! 
server.use(express.json(), cors(), morgan("tiny"), helmet());

const upperCaseName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    // immutable way
    // req.newBody = { ...req.body }
    // req.newBody.name = req.newBody.name.toUpperCase();
    next();
}


// ======= Get all users =======
server.get('/users', (req, res) => {
    userDb.get()
        .then(users => 
            res
            .json(users))
        .catch(err => 
            res
            .status(500)
            .json({ error: "The users info could not be found" }
        ));
})

// ======= Get users posts by id =======
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    // userDb.get(parseInt(id)) It still works without parseInt()...
    userDb.get(id)
        .then(user => 
            res
            .json(user))
        .catch(err => 
            res
            .status({ error: `user with id ${id} could not be found`}));
})

// ======= Get users posts by id =======
server.get('/users/:id/posts', (req, res) => {
    const { id } = req.params;
    console.log(id);
    userDb.getUserPosts(id)
        .then(user => 
            // ternary
            (user.length > 0) ? 
            res
            .json(user) : 
            res
            .status(404)
            .json({ message: `The user with the ID ${id} does not exist.` }
        ))
        .catch(err => 
            res
            .status(500)
            .json({ error: "The user info could not be found" }
        ));
})

// ======= Post user =======
server.post('/users', upperCaseName, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb
                .get(id)
                .then(user => {
                    // ternary
                    (!user) ?
                        res
                        .status(400)
                        .json({ error: "A name for the user is needed" }) :
                        res
                        .status(201)
                        .json(user);
                })
        })
        .catch(err => 
            res
            .status(500)
            .json({ error: "Character could not be created, check key value pair" }))
})

// ======= Update user =======
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    userDb
        .update(id, newUser)
            .then(user => {
                (!user) ?
                res
                .statu(404)
                .json({ error: `User ID ${id} does not exhist` }) :
                userDb 
                    .get(id)
                    .then(user => {
                        (!user) ?
                        res
                        .status(404)
                        .json({ error: `ID ${id} could not be retrieved` }) :
                        res
                        .status(200)
                        .json(user)
                    })
                res.status(200).json(user);
            })
            .catch(err => console.log(err));
});

// ======= Delete user =======
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    userDb
        // had to parseInt the id because we're grabbing it from req.params which is the URL
        .remove(parseInt(id)) 
        .then(test => {
            // ternary
            (!test) ?
                res
                .status(404)
                .json({ error: `User, ID ${id} does not exhist`}) :
                res
                .status(200)
                .json({ message: `User ID ${id} was successfully deleted`})
        })
        .catch(err => 
            res
            .status(500)
            .json({ error: "An error has occured while deleting the user" }));
});

const port = 3400;
server.listen(port, () => console.log(`\n ====== Port ${port} ====== \n`));