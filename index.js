//import mods
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const port = 8000;

//server helpers
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

//init server
const server = express();
server.use(express.json());

//middleware
server.use(cors());

const upperCase = (req, res, next) => {
    if(req.body.name){
        req.body.name = req.body.name.toUpperCase();
    }
    if (req.body.text){
        req.body.text = req.body.text.toUpperCase();
    }
    next();
};

//
server.use(logger('combined'), cors(), helmet());

server.get('/users', (req, res) => {
    userDb  .get()
            .then(query =>{
                res.status(200)
                    .json(query);
            })
            .catch(err=>res.send(err));
});

//GET blogs
server.get('/blogs', (req,res)=>{
    postDb  .get()
            .then(query=>{
                res .status(200)
                    .json(query);
            })
            .catch(err =>res.send(err));
})

//GET useres by id
server.get('/users/:id', (req, res) => {
    req.id = req.params.id;
    userDb.get(req.id)
            .then(query =>{
                if (!query){
                    return res.status(500)
                                .json({
                        error: `Information about the user with the provided id number could not be retrieved.` })
                }
                res.status(200)
                    .json(query);
            })
            .catch(err=>res.send(err));
});

//GET blogs by id
server.get('/blogs/:id', (req, res) => {
    req.id = req.params.id;
    postDb  .get(req.id)
            .then(query =>{
                if (!query){
                    console.log(res);
                    return res  .status(500)
                                .send(`good?!`)
                                .json({
                                    error: `Info about this blog post with the given ID is not available.` })
                }
                res.status(200)
                    .json(query);
            })
            .catch(err=>res.send(err));
});

//GET blogs user id
server.get('/blogs/user/:userId', (req, res) => {
    req.userId = req.params.userId;
    userDb  .getUserPosts(req.userId)
            .then(posts =>{
                if (!posts){
                    // console.log(res);
                    return res  .status(500)
                                .json({
                                    error: `Info about this blog post with the given ID is not available.` })
                }
                res.status(200)
                    .json(posts);
            })
            .catch(err=>res.send(err));
});

//POST w/ middleware
server.post('/users', upperCase, (req, res) =>{
    userDb.insert(req.body)
            .then(id =>{
                res.status(201)
                    .json(id);
            })
            .catch(err=>res.send(err));
});

//POST blogs
server.post('/blogs', //upperCase,
            (req, res) =>{
                // console.log(req.body);
    postDb  .insert(req.body)
            .then(id =>{
                console.log(id);
                res.status(200)
                    .json(id);
            })
            .catch(err=>res.send(err));
});

//DELETE user id
server.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    userDb.remove(id)
            .then(responseId=>{
                if (responseId===0){
                    return res.status(500)
                                .json({
                        error: `User not found.` })
                }
                res.status(204)
                    .send(`ID: ${responseId} deleted`);
            })
            .catch(err=>res.send(err));
});

//DELETE blog id
server.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    postDb  .remove(id)
            .then(responseId=>{
                if (responseId===0){
                    return res.status(500)
                                .json({
                        error: `Post with the provided id number cannot be found.` })
                }
                res .status(204)
                    .send(`ID: ${responseId} has been deleted`);
            })
            .catch(err=>res.send(err));
});

//PUT user id w/ midware
server.put('/users/:id', upperCase, (req, res)=>{
    const id = req.params.id;
    userDb.update(id, req.body)
            .then(ifUpdated =>{
                if (ifUpdated === 1){
                    res.statu(200)
                        .send("User record updated")
                } else {
                    res.status(422)
                        .send("Error updating user")
                }
            })
            .catch(err=>res.send(err));
});

//PUT blod id w/ midware
server.put('/blogs/:id', upperCase, (req, res)=>{
    const id = req.params.id;
    postDb  .update(id, req.body)
            .then(ifUpdated =>{
                console.log(req.body.postedBy);
                if (ifUpdated === 1){
                    res.statu(200)
                        .send("Blog post updated")
                } else {
                    res.status(422)
                        .send("Error updating blog")
                }
            })
            .catch(err=>res.send(err));
})


// server.listen to my port
server.listen(port, () => {
  console.log(`checking out whats going on with port ${port}`);
});
