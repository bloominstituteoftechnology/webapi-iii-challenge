const express = require('express');
const logger = require('morgan') ;

const CMW = require('./data/helpers/custom_middleware');
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');
const usersRoute = require('./data/routes/user_routes')
// const userRouter = require('./data/routers/user_router');
const PORT = 5050;

server=express();
server.use(
    express.json(),
    logger('dev')
)
server.use('/users', usersRoute);

//users



//posts
server.get('/posts', (req, res)=>{
    postDB.get()
    .then(posts=>{
        res.json(posts);
    })
    .catch(err=>{
        res
        .status(500)
        .json({ message: "problem grabbing the Posts"})
    })
})



server.get('/post/:id', (req, res)=>{
    const { id } = req.params;
    postDB.get(id)
        .then(post=>{
            res.json(post)
        })
        .catch(err=>{
            res.status(500)
                .json({ message: "trouble grabbing specific post" })
        })
})



server.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})