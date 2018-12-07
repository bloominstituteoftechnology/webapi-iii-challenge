const express = require('express')
const users = require("./data/helpers/userDb.js")
const posts = require("./data/helpers/postDb.js")
const PORT = 4000;
const server = express()
const helmet = require("helmet");
const logger = require("morgan");

const server = express(); 

server.use(express.json(), logger("tiny"), helmet())

 const upperCase = (req, res, next) => {
    const changeName = req.body.name.toUpperCase();
    req.body.name = changeName;
    next();
  };


server.get("/", (req, res) => {
    res.json({message: "Working"})
 })

 server.get('/api/users', (req, res) => {
    users
      .get()
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
     users
     .get(id)
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


server.post("/api/users", upperCase, (req, res) => {
    req.body.name ?
       users
       .insert(req.body)
       .then(() => {
           users.get().then(user => {
           res.status(201).json(user);
           });
       })
       .catch(err => {
           res
           .status(500)
           .json({
               error: "There was an error while saving the post to the database"
           });
       })
   :
       res
       .status(400)
       .json({ errorMessage: "Please provide username for the user" });
    });


 server.delete('/api/users/:id', (req, res) => {
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

 server.put('/users/:id', upperCase, (req, res) => {
    const { id } = req.params

     req.body.name ?
        users.update(id, req.body)
            .then(count => {
                count ?
                    users.get(id).then(user => {
                        res.json(user)
                    })
                    :
                    res
                        .status(404)
                        .json({ error: "The user with specified ID does not exist." })
            })
            .catch( err => {
                res
                    .status(500)
                    .json({ error: "The username could not be update" })
            })

        : 
        res
            .status(400)
            .json({ errorMessage: "Please provide username for the user" })

    }); 

    server.get('/api/posts', (req, res) => {
        posts
            .get()
            .then(posts => {
                res.json(posts)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "Unable to retrieve posts" })
                })
         })

 server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
}) 