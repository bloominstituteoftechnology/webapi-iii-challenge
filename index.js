// server setup;
const express = require('express');
const server = express();
server.use(express.json());
const port = 4000;

// MIDDLEWARE
const logger = require('morgan');  // logging;
const helmet = require('helmet'); //  security;
const cors = require('cors');  // react calls;
server.use(cors());


// import server, db
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

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

 server.listen(port, () => console.log(`server rolling on port ${port}`));
