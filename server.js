const express = require("express");
const user = require('./data/helpers/userDB.js');
const post = require('./data/helpers/postDB.js');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")

const server = express();
const port = 5000;
///////////////////////
// Middleware

function upperCase(req,res,next){
    next()
}

server.use(morgan("short"));
// server.use(helmet());
server.use(express.json());
server.use(cors());

///////////////////////
// Routes

server.get("/",(req,res) => {

        res.status(200).send(`Available routes are:\n/users\n/posts`);
})

server.get("/users",upperCase,async(req,res) => {

    try {
        const users =  await user.get()
        if(users){
           res.status(200).json(users);
        } else {
            console.log("Users requested were not found")
            res.status(404).send({ message: `The users requested were not found` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

server.get("/users/:id",upperCase,async(req,res) => {
    const id = req.params.id
    try {
        const users =  await user.get(id)
        const usersPosts =  await user.getUserPosts(id)
        if(users && usersPosts){
            res.status(200).json({user:users,posts:usersPosts});
        } else {
            console.log("Users were not found")
            res.status(404).send({ message: `The posts requested were not found or do not exist` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

server.get("/posts",upperCase,async(req,res) => {

    try {
        const posts =  await post.get()
        res.status(200).json(posts);
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

server.get("/posts/:id",upperCase,async(req,res) => {
    const id = req.params.id
    try {
        const posts =  await post.get(id)
        if(posts){
            res.status(200).json(posts);
        } else {
            console.log("Users were not found")
            res.status(404).send({ message: `The posts requested were not found or do not exist` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

server.listen(port,() => console.log(`The server is listening on port ${port}`))