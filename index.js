const express = require('express');
const logger = require('morgan') ;
// const cors = require('cors');

const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

const PORT = 5050;

server=express();
server.use(
    express.json(),
    logger('dev')
)
server.use

//users
server.get('/users', (req, res)=>{
    userDB.get()
        .then((users)=>{
            res.json(users)
        })
        .catch(err=>{
            res.status(500)
            .json({message: "problem grabbing the Users"})
        })
});

server.get('/user/:id', (req, res)=>{
    const { id } = req.params;
    userDB.get(id)
        .then(user=>{
            user?
                res.json(user):
                res.status(404)
                .json({ message: "Specific User doesn't exsist"})
            
        })
        .catch(err=>{
            res.status(500)
                .json({ message:"Trouble fetching that User"})
        })
})

server.post('/user', (req, res)=>{
    const data = req.body;
        userDB.insert(data)
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(err=>{
                res.status(500)
                    .json({ message: "Trouble adding new user "})
            })
           
})

//using getuserpost
server.get('/posts/user/:id', (req, res)=>{
    const { id } = req.params;
    userDB.getUserPosts(id)
    .then(posts=>{
        posts.length !== 0?
        res.json(posts):
        res.status(404)
            .json({message: "no posts found for this User"})
    })
    .catch(err=>{
        res.status(500)
            .json({ message: "trouble getting posts for this User"})
    })
    
})


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