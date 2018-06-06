const express = require("express");
const cors = require('cors');
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");
const userDb = require("./data/helpers/userDb");

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({origin: "http://localhost:3000"}));

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}

server.get('/api/users', (req, res)=>{
    userDb
        .get()
        .then(users=>{
            if(users.length===0){
                sendUserError(404, "Users could not be found", res);
            } else{
            res.json({ users });
            }
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving users information");
        });
});

server.get('/api/posts', (req, res) =>{
    postDb
        .get()
        .then(posts=>{
            if(posts.length===0){
                sendUserError(404, "Posts could not be found", res);
            } else{
            res.json({ posts })
            }
        })
        .catch(err =>{
            sendUserError(500, "Post information could not be retrieved", res)

        })
})

server.get('/api/tags', (req, res) =>{
    tagDb
        .get()
        .then(tags =>{
            if(tags.length===0){
                sendUserError(404, "Posts could not be found", res);
            } else{
            res.json({tags})
            }
        })
        .catch(err =>{
            sendUserError(500, "Tag information could not be retrieved", res)
        })
})

server.post('/api/users', (req, res) =>{
    const { name } = req.body;
    if(!name){
        sendUserError(400, "Must include name", res)
    }
    userDb
        .insert(name)
        .then(res =>{
            res.status(201).json(res);
        })
        .catch(err =>{
            sendUserError(500, "User could not be saved", res);
        })
})

server.post('/api/posts', (req, res) =>{
    const { text } = req.body;
        if(!text){
            sendUserError(400, "Must include text", res);
        }
    postDb
        .insert(text) 
        .then(res => {
            res.status(201).json(res);
        })
        .catch(err =>{
            sendUserError(500, "Post could not be saved", res);
        });
})

server.listen(port, () =>{ console.log(`Server is listening on ${port}`)});