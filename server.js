const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
server.use(cors());
server.use(express.json()); // initially forgot to include this.
server.use(morgan('dev'));
 
// custom middleware 
function uppercase(req, res, next) {

    if (req.body.name !== undefined) {
        const reqName = req.body.name;
        const checkName = req.body.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (reqName === checkName) {
            next();
        } else {
            res.status(400).json({message:'Please capitalize the user name'});
        }
    } else {
        next();
    }
}

server.use(uppercase);


// adding a default GET at the root to tell folks the API is live.
server.get('/', (req,res) => res.send({API: "live", "Users": "live", "Posts": "not live"}));


// ALL USER RELATED STUFF 
server.get('/api/users', (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({error: "The users information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    userDb.get(id)
        .then(user => {
            if (user) {
                //res.status(200).json(user);
                userDb.getUserPosts(id).then(posts => {
                    res.status(200).json({user: user, posts: posts});
                }).catch(err => {
                    res.status(500).json({error: "The user and posts could not be retrieved."})
                })
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."});
        })
});

server.post('/api/users/', uppercase, async (req, res) => {
    if (req.body.name !== undefined) {
        try {
            console.log(req.body);
            const user = await userDb.insert(req.body);
            userDb.get(user.id)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(404).json({message: "The user with the specified ID does not exist."}));
        }
        catch (err) {
            res.status(500).json({message: "There was an error while saving the user to the database", err})
        }
    } else {
        res.status(400).json({message: "Please provide a name for the user."});
    }
})

server.delete('/api/users/:id', (req,res) => {
    userDb.remove(req.params.id).then(count => {
        if (count) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }
    }).catch(err => {
        res.status(500).json({error: "The user could not be removed"});
    })
})

server.put('/api/users/:id', async (req,res) => {
    if (req.body.name !== undefined) {
        userDb.update(req.params.id, req.body).then(count => {
            if (count) {
                userDb.get(req.params.id).then(user => res.status(200).json(user)).catch(err => res.status(404).json({message:"The user with the specified ID does not exist."}));
            }
            else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        }).catch(err => {
            res.status(500).json({message: "The user with the specified ID could not be modified."});
        })
    } else {
        res.status(400).json({message: "Please provide a name for the user."});
    }
})

// ALL POST RELATED STUFF


// Server Listening on Port 9000
server.listen(9000, () => console.log('Server running on port 9000'));