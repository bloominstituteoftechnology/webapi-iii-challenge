const express = require("express");
const server = express();
const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDb");
const helmet = require("helmet");
const logger = require("morgan");


const PORT = 5050;

server.use(express.json(), helmet(), logger("tiny"));

server.get("/users", (req, res) => {
    userDB.get()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    message: "unable to find users"
                })
        })
});
server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userDB.get(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: "user not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "failed to get user"
            })
        })
})

server.post("/user", (req, res) => {
    const newUser = req.body;
    userDB.insert(newUser)
        .then(id =>
            userDB.get(id.id)
        )
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: "add user failed"
            })
        })
})
server.delete("/users", (req, res) => {
    const id = req.query.id;
    userDB.remove(id)
        .then(num => {
            if (num) {
                res.json({
                    message: "user deleted"
                })
            } else {
                res.status(400).json({
                    message: "id not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "could not delete user"
            })
        })
})
server.listen(PORT, () => {
    console.log("is this working?");
});