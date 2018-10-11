// all required imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");


//Server Helpers
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');


// Server init
const server = express();
server.use(logger("default", "dev"));
server.use(cors());
server.use(helmet());
server.use(express.json());
const port = 8000;


//middleware
server.use(cors());
 const upperCase = (req, res, next) => {
    req.text = req.params.text.toUpperCase();
    next();
};

//
 server.use(logger('combined'), cors(), helmet());
 server.get('/blogs', (req, res) => {
    userDb.get()
            .then(query =>{
                res.status(200)
            .json(query);
            })
            .catch(err=>res.send(err));
});


//get blog by id
 server.get('/blogs/:id',
            (req, res) => {
    req.id = req.params.id;
    userDb.get(req.id)
            .then(query =>{
              if (!query){
    return res.status(500)
                .json({
        error: `Information about the user with the provided id number could not be retrieved.` })
}
res.status(200)
                res.json(query);
            })
            .catch(err=>res.send(err));
});

//
 server.post('/blogs', (req, res) =>{
    userDb.insert(req.body)
            .then(id =>{
                res.status(201)
                res.json(id);
            })
            .catch(err=>res.send(err));
});


// DELETE  request for spec user
 server.delete('/blogs/:id', (req, res)=>{
    console.log(req.params);
    const id = req.params.id;
    userDb.remove(id)
            .then(responseId=>{
              if (responseId===0){
    return res.status(500)
                .json({
        error: `User with the provided id number cannot be found.` })
}
res.status(204)
                res.send(`ID: ${responseId} deleted`);
            })
            .catch(err=>res.send(err));
});

//PUT code to edit existing user;
 server.put('/blogs/:id', upperCase, (req, res)=>{
    const id = req.params.id;
    console.log(id);
    userDb.update(id, req.body)
            .then(ifUpdated =>{
                if (ifUpdated === 1){
                   res.statu(200)
                    res.send("User record updated")
                } else {
                  res.status(422)
                    res.send("Error updating")
                }
            })
            .catch(err=>res.send(err));
})

// server listen
server.listen(port, () => {
  console.log(`Checkout whats going on in ${port}`);
});
