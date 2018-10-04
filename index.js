// import modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const port = 9000;
const helmet = require('helmet');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

// instanciate your server
const server = express();
server.use(express.json());

// MIDDLEWARES

server.use(cors());

const upperCase = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
};

server.use(logger('combined'), cors(), helmet());

server.get('/blogs', (req, res) => {
    userDb.get()
            .then(query =>{
                res.status(200)
                    .json(query);
            })
            .catch(err=>res.send(err));
});

server.get('/blogs/:id', (req, res) => {
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

server.post('/blogs', upperCase, (req, res) =>{
    userDb.insert(req.body)
            .then(id =>{
                res.status(201)
                    .json(id);
            })
            .catch(err=>res.send(err));
});

server.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    userDb.remove(id)
            .then(responseId=>{
                if (responseId===0){
                    return res.status(500)
                                .json({ 
                        error: `User with the provided id number cannot be found.` })
                }
                res.status(204)
                    .send(`ID: ${responseId} has been deleted`);
            })
            .catch(err=>res.send(err));
});

server.put('/blogs/:id', upperCase, (req, res)=>{
    const id = req.params.id;
    userDb.update(id, req.body)
            .then(ifUpdated =>{
                if (ifUpdated === 1){
                    res.statu(200)
                        .send("The user record has been updated")
                } else {
                    res.status(422)
                        .send("Error took place during updating")
                }
            })
            .catch(err=>res.send(err));
})

// call server.listen w/ a port of your choosing
server.listen(port, () => {
  console.log(`Listening to server updates on port ${port}`);
});
// hit your port+/ to see "hello wold!"