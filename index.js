const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

server.use(cors());
server.use(express.json());

const port = 9000;

//Middlewares
server.use(morgan('combined'));

const yell = (req, res, next)=> {
    console.log(req.body.name);
    const loudName = req.body.name.toUpperCase();
    req.body.name = loudName;
    next();
};

//User Routes


server.get('/', (req, res)=> {
    res.send('Welcome to Node Blog :)')
});


//GET all users
server.get('/api/users', (req, res)=> {
    userDb.get()
        .then(users=> {
            console.log(users);
            res.status(200).json({users});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved"});
        })
});


// GET a user by specific id
server.get('/api/users/:id', (req, res)=> {
    console.log(req.params.id);
    userDb.get(req.params.id)
        .then(user=> {
            console.log(user);
            res.status(200).json({user});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved."});
        })
});

//POST a new user to the database
server.post('/api/users', yell, (req, res)=> {
    console.log(req.body);
    const {name} = req.body;
    const newUser = {name};
    userDb.insert(newUser)
        .then(userId=> {
            const {id} = userId;
            userDb.get(id)
                .then(user=> {
                    if (!req.body.name) {
                        res.status(404).json({error: "User not found"});
                    }
                    res.status(201).json({user});
                })
        })
        .catch(err=> {
            res.status(500).json({error: "This user could not be added to the database"});
        })
});


//DELETE a user
server.delete('/api/users/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;
    userDb.remove(id)
        .then(user=> {
            if (!user) {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
            res.status(200).json({user});
        })
        .catch(err=> {
            res.status(500).json({error: "The user could not be removed"});
        })
});

//PUT an update of a specific user on the database
server.put('/api/users/:id', yell, (req, res)=> {
    console.log(req.params, req.body);
    const {id} = req.params;
    const {name} = req.body;
    const updatedUser = {name};
    userDb.update(id, updatedUser)
        .then(updatedUser=> {
            if (!updatedUser) {
                res.status(404).json({error: "This user does not exist"});
            } else if (!req.body) {
                res.status(400).json({error: "Please add a name for this user"});
            } else {
                res.status(200).json({updatedUser});
            }
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be saved to the database"});
        })
});

//Posts Routes

//GET all posts
server.get('/api/posts', (req, res)=> {
    postDb.get()
        .then(posts=> {
            res.status(200).json({posts});
        })
        .catch(err=> {
            res.status(500).json({error: "Information could not be retrieved"});
        })
});

//GET a specific post by its id
server.get('/api/posts/:id', (req, res)=> {
    postDb.get(req.params.id)
        .then(post=> {
            console.log(post);
            res.status(200).json({post});
        })
        .catch(err=> {
            res.status(500).json({error: "This post could not be retrieved"});
        })
});

//POST a new post
server.post('/api/posts', (req, res)=> {
    console.log(req.body);
    const {text, userId} = req.body;
    const newPost = {text, userId};
    postDb.insert(newPost)
        .then(newPost=> {
            if (!req.body) {
                res.status(400).json({error: "Please add text to this post"});
            }
            res.status(201).json({newPost});
        })
        .catch(err=> {
            res.status(500).json({error: "This post could not be added to the database"});
        })
});

//UPDATE an existing post
server.put('/api/posts/:id', (req, res)=> {
    console.log(req.params);
    console.log(req.body);
    const {id} = req.params;
    const {text} = req.body;
    const updatedPost = {text}
    postDb.update(id, updatedPost)
    .then(updatedPost=> {
        if (!updatedPost) {
            res.status(404).json({error: "This post does not exist"});
        } else if (!req.body) {
            res.status(400).json({error: "Please add some text to this post"});
        } else {
            res.status(200).json({updatedPost});
        }
    })
    .catch(err=> {
        res.status(500).json({error: "This information could not be saved to the database"});
    })
});

//DELETE an existing post
server.delete('/api/posts/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;
    postDb.remove(id)
        .then(post=> {
            if (!post) {
                res.status(404).json({error: "This post does not exist"});
            }
            res.status(200).json({post});
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be deleted from the database"});
        })
});

//Posts by UserID

//GET Posts by UserID
server.get('/api/users/posts/:userId', (req, res)=> {
    const {userId} = req.params;
    userDb.getUserPosts(userId)
        .then(postsByUser=> {
            if (!postsByUser) {
                res.status(404).json({error: "There are no posts"});
            }
            res.status(200).json({postsByUser});
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be retrieved"});
        })
});

//Listener
server.listen(port, ()=> console.log(`API running on port ${port}`));