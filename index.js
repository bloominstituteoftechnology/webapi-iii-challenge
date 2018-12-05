const express = require('express')
const users = require("./data/helpers/userDb.js")
const PORT = 4000;
const server = express()

server.use(express.json())

 server.get("/", (req, res) => {
    res.json({message: "Working"})
 })

 server.get('/users', (req, res) => {
    users.get()
        .then(users => {
            res
                .status(200)
                .json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The users could not be retrieved"})
        })
 })

 server.get('/users/:id', (req, res) => {
    const { id } = req.params;
     users.get(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(400).json({
                    message: "The user with the id does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved"
            })
        })
 })

 server.delete('/users/:id', (req, res) => {
    const { id } = req.params
    users.remove(id).then().catch()
 })
 
 server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
}) 