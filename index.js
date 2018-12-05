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

 if (user.name) {
    users.insert(user)
        .then(resp => {
            users.get(resp.id).then(user => {
                res
                    .status(201)
                    .json(user)
            })
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "There was an error while saving the post to the database" })
        })

}else {
    res
        .status(400)
        .json({errorMessage: "Please provide username for the user"})
}
})



 server.delete('/users/:id', (req, res) => {
    const { id } = req.params
    users.remove(id)
      .then(count => {
          count ?
            users.get()
               .then(users => {
                   res
                     .status(200)
                     .json(users)
               })
            :
            res.status(404).json({error:"Invalid id"})
      })
    .catch( err => {
        res
          .status(500)
          .json({error: "Failed to delete user"})
    })
 })

 server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
}) 