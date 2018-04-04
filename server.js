const express = require("express");
const bodyParser = require('body-parser');

const db1 = require('./data/helpers/postDb.js');
const db2 = require('./data/helpers/userDb.js');
const db3 = require('./data/helpers/tagDb.js');

const server = express();
server.use(bodyParser.json());
server.get("/", function(req,res){
    res.json({api:'running'});
});

server.get('/api/posts/:postId', (req, res)=>{
    const { postId } = req.params;
    db1
    .getPostTags(postId)
    .then(users=>{
        res.json(users);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

server.get

server.post('/api/posts', (req, res)=>{
    const post = req.body
    db1
    .insert(post)
    .then(response=>{
        res.json(post)
    })
    .catch(error =>{
        res.status(500)
        res.json({error:'there was error entering to the database'});
    })
})



const port = 5000;
server.listen(port, () => console.log("API running on port 5000"));
