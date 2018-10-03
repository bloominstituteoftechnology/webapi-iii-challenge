// pull in express
const express = require('express');
const port = 9000;
const dbUsers = require("./data/helpers/userDb.js");

// create server/connect to express
const server = express();

server.use(express.json());

// middleware

function uppercase(req, res, next) {
    req.body.name = req.body.name.charAt().toUpperCase() + req.body.name.slice(1);
    next();
  };


server.get("/api/users",  (req, res) => {
    dbUsers.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({
                error: "The user information could not be retrieved."
            });
        });
});
server.get("/api/users/:id",  (req, res) => {
    dbUsers.get(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({
                error: "The user information could not be retrieved."
            });
        });
})



server.post('/api/users', uppercase, (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const newUser = { name};
    dbUsers.insert(newUser)
    .then(insertedUser => {
        res.status(201).json({'User created': insertedUser});
    })
    .catch(err => {
        res.send(err);
    });
    if (!name) {
        res.status(400).json({
            errorMessage: "Please provide a name for the user."
        })
    }
   
    dbUsers
        .insert(newUser)
        .then(userId => {
            
            dbUsers.get(userId).then(user => {
                console.log(user);
                if (!user) {
                    return res
                        .status(422)
                        .json({
                            Error: `User does not exist by that ${id}`
                        });
                }
                res.status(201).json(user);
            });
        })
        .catch(err => {
            console.error(err);
            res.json({
                error: "There was an error saving the user to the database"
            });
        });
});


server.put("/api/users/:id", uppercase, (req, res) => {
    dbUsers.update(req.params.id, req.body)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({
                message: "Error: User could not be updating"
            });
        });
});

server.delete("/api/users/:id", (req, res) => {
    dbUsers.remove(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({
                message: "Error: User could not be deleted"
            });
        });
});




server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});