const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const customMiddleware = require('./Custom_Middleware');
const userRouter = require('./routers/user_requests');

const server = express();
const PORT = 4100;

//middleware
server.use(
    express.json()
);


//route handlers

//GET
server.get('/users', (req, res) => {
    userDb.get()
        .then((users) => {
            if (users.length > 0) {
                res.json(users)
            } else {
                res
                .status(404)
                .json({
                    message: "There are currently no Hobbits in the Shire. Check back later or go create a new one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the Hobbits. They're hiding."
            })
        })
})

server.get('/posts', (req, res) => {
    postDb.get()
    .then((posts)=>{
        if (posts.length > 0) {
            res.json(posts)
        } else {
            res
            .status(404)
            .json({
                message: "There are no quotes. The Hobbits appear to be mute right now."
            })
        }
    })
    .catch(err => {
        res
        .status(500)
        .json({
            message: "Could not fetch those quotes. They're hiding."
        })
    })
})

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    postDb.get(id)
        .then(posts => {
            console.log("get posts by id", posts);
            if(posts.length > 0) {
                res.json(posts)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not have any notable quotes. Perhaps search for a better one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find those quotes."
            })
        })
})

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not exist."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find this hobbit"
            })
        })
})


server.get('/users/:id/posts', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id)
                    .then(posts => {
                        if (posts.length > 0) {
                            res.json(posts);
                        } else {
                            res
                            .status(404)
                            .json({
                                message: "This Hobbit has said nothing worth writing down."
                            })
                        }
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "This Hobbit does not exist so we cannot quote it."
                })
            }
        })
        .catch(err=>{
            res
            .status(500)
            .json({
                message: "Failed to find this Hobbit or its quotes."
            })
        })
})

//POST

server.post('/users', customMiddleware.uppercase, (req, res) => {
    const user = customMiddleware.upperName;
    //add if user is longer than 128 characters, return error
    if (user) {
        userDb.insert(user)
            .then(userId => {
                userDb.get(userId.id)
                    .then(user => {
                        res.json(user)
                    })
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Could not create a new Hobbit."
                })
            })
    } else {
        res
        .status(400)
        .json({
            message: "A new Hobbit needs a name. How else can we call for it?"
        })
    }
})



//listening
server.listen(PORT, ()=> {
    console.log(`Server is alive at ${PORT}`);
});