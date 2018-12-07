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

server.use('/users', userRouter);

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

//POST



//listening
server.listen(PORT, ()=> {
    console.log(`Server is alive at ${PORT}`);
});