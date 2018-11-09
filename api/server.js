const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const upperCase = require("../upperCase/upperCase.js");
const postDb = require('../data/helpers/postDb');
const userDb = require('../data/helpers/userDb');

const server = express();

//Middleware Stuffage
server.use(express.json());
server.use(helmet()); 
server.use(morgan('dev'));//does it matter what one we use at all?

// server.use(upperCase);

//Server Code


/*
--------------------------------
I will hopefully have time before you start grading to implement router
--------------------------------
*/
server.get('/', (req, res) => {
    res.status(200).json({ api: 'it is running properly ' });
});

//users .gets 
server.get('/api/users',(req,res)=>{
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json("can not find the users ",error)
        })
});

server.get("/api/users/:id",(req,res)=>{
    const { id } = req.params;

    userDb.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json("Can not get the users ", error)
        })
})

// user .posts
server.post('/api/users', async (req, res) => {
    console.log('body', req.body);
    try {
        const userData = req.body;
        const userId = await userDb.insert(userData);
        const user = await userDb.get(userId.id);
        res.status(201).json(user);
    } catch (error) {
        let message = 'error creating the user';

        if (error.errno === 19) {
            message = 'please provide the name of the user';
        }

        res.status(500).json({ error: "There was an error while saving the user to the database" });
    }
});

//posts .gets
server.get('/api/posts',(req,res)=>{
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json("can not find the posts ",error)
        })
});

server.get("/api/posts/:id",(req,res)=>{
    const { id } = req.params;

    postDb.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json("Can not get the users ", error)
        })
})

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
});

// Posts post section

server.post('/api/posts', async (req, res) => {
    console.log('body', req.body);
    try {
        const postData = req.body;
        const postId = await postDb.insert(postData);
        const post = await postDb.get(postId.id);
        res.status(201).json(post);
    } catch (error) {
        let message = 'error creating the post';

        if (error.errno === 19) {
            message = 'please provide both the title and the text section';
        }

        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

server.put('/api/posts/edit/:id', (req, res) => {
    const { id } = req.params;
    const edited = req.body;
    postDb.update(id, edited)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} posts updated`,ID : id });
            } else {
                res.status(404).json({ message: 'post is non-existant' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified.",error : error });
        });
});

server.delete('/api/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(count => {
        res.status(200).json({message : `${count} posts were deleted : ID ${req.params.id}`});
    })
    .catch(err => {
        res.status(500).json({ message: 'error deleting post',error : error });
    });
});
// server.get('/secret', gatekeeper, (req, res) => {
//     res.send(req.welcomeMessage);
//   });   how he did it


server.put('/api/users/edit/:id', (req, res) => {
    const { id } = req.params;
    const edited = req.body;
    userDb.update(id, edited)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} users updated`,ID : id });
            } else {
                res.status(404).json({ message: 'user does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "This users information could not be modified.",error : error });
        });
});

server.delete('/api/users/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
        res.status(200).json({message : `${count} users were deleted : ID ${req.params.id}`});
    })
    .catch(err => {
        res.status(500).json({ message: 'error deleting user',error : err });
    });
});

module.exports=server;