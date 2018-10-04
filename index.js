// all required imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");


// next we got to get the server going and add middleware

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("default", "dev"));


const port = 8000;
server.listen(8000, () => console.log("===API port 8000==="));
///////////////////////////////
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
 // instanciate your server
const server = express();
server.use(express.json());
server.use(cors());
 const upperCase = (req, res, next) => {
    req.text = req.params.text.toUpperCase();
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
 server.post('/blogs', (req, res) =>{
    userDb.insert(req.body)
            .then(id =>{
                res.status(201)
                res.json(id);
            })
            .catch(err=>res.send(err));
});
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
server.listen(port, () => {
  console.log(`Checkout whats going on in ${port}`);
});
