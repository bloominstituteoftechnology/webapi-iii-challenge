const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dbConfig= require('./data/dbConfig');
const dbUser = require('./data/helpers/userDb')
const dbPost = require('./data/helpers/postDb')
const dbTag = require('./data/helpers/tagDb')

const server = express();
server.use(helmet())
server.use(cors());
server.use(express.json());

server.get('/', (req, res)=>{
    res.send('api is running')
})

server.get('/user', (req, res)=>{
    dbUser
    .get()
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(500).json({error: "geting fail"});
    });
});

server.post('/user', (req,res)=>{
const user = req.body
dbUser
.insert(user)
.then(response =>{
    dbUser.getUserPosts(response.id)
    .then(user =>{
        res.json(user)
    
    })
})
.catch(err=>{
    res.status(400).json({error: "Please provide name and bio for the user."});
});

})
server.delete('/user/:id', (req,res)=>{
const { id } = req.params
let post;
dbUser.getUserPosts(id)
.then(foundUser=>{
    user = {...foundUser[0]}
    dbUser.
    remove(id)
    .then(response =>{
            res.status(200).json(post);
    });

})
.catch(err =>{
    res.status(500).json({error:"this darn error"});    
  });
})



server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));