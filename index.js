const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 9000

const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

//** Middleware **//
const makeCaps = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
};
server.use(express.json(),logger('tiny'), cors(), helmet());

//** User Routes **//

//get all
server.get('/api/users', (req,res) => {
    userDb
    .get()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(500).json({error: "user not found"}));
});

//get by id
server.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    userDb
    .get(userId)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.status(200).send(user);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'user could not be populated'})
    });
});

//post
server.post('/api/users', makeCaps, (req,res) => {
    const userInfo = req.body;
    console.log("userInfo", userInfo);
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
            res.status(400).json({msg: 'please provide all required fields'})
        } else {
            res.status(500).json({error: err});
        }
    });
});

//put
server.put('/api/users/:userId', function(req, res) {
    const id = req.params.userId;
    const update = req.body;
    userDb
    .update(id, update)
    .then(count => {
        if (count > 0) {
            userDb.get(id).then(users => {
                res.status(200).json(users[0]);
            })
        } else {
            res.status(404).json({msg: 'user not found'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//delete
server.delete('/api/users/:userId', function(req, res){
    const id = req.params.userId;
    userDb
    .get(id)
    .then(user => {
        userDb.remove(id)
        .then(response => {
            res.status(200).json(user);
        })
    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});


//** Post Routes **//

//get all
server.get('/api/posts', (req,res) => {
    postDb
    .get()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => res.status(500).json({error: "posts not found"}));
});

//get by id
server.get('/api/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    postDb
    .get(postId)
    .then(post => {
        if(!post) {
            res.status(404).json({message: 'post not found'});
        } else {
            res.status(200).send(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'post could not be populated'})
    });
});

//post --- not working
server.post('/api/posts/', (req,res) => {
    const {text, userId} = req.body;
    const newPost = {userId, text};

    if (!text || !userId) {
        return res.status(400).json({msg: 'please provide all required fields'});
    }
    postDb
    .insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({error: "Error saving post"});
    });
});

//put

//delete
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.postId;
    postDb
    .get(id)
    .then(user => {
        postDb.remove(id)
        .then(response => {
            res.status(200).json(user);
        })
    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});


server.listen(port, () => {
    console.log(`Its happening on port ${port}`);
});