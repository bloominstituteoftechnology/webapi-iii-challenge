const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan');
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));



const uppercaseName = (req, res, next) => {
    const user = req.body;
    user.name = user.name.toUpperCase();
    next();
}

//get post and users

server.get('/api/posts', (req, res) => {
    postDB.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: 'the posts could not be retrieved' })
        })
})

server.get('/api/users', (req, res) => {
    userDB.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'the users could not be retrieved' })
        })
})
//get post and users by ID
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    postDB.get(id)
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: 'the post could not be retrieved' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    userDB.get(id)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'the user could not be retrieved' })
        })
})
//post a user to a database and apply middleware
server.post('/api/users', uppercaseName, (req, res) => {
    const userInfo = req.body;
    userDB.insert(userInfo)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => res.status(500).json({ errorMessage: 'please provide user info' }))
})

// post a post
server.post('/api/posts', (req, res) => {
  const postInfo = req.body;
  userDB
    .insert (postInfo)
    .then (result => {
      res.status (201).json (result);
    })
    .catch (err =>
      res.status (500).json ({errorMessage: 'please provide post info'})
    );
});

//update user and update post

server.put('/api/posts/:id',(req,res)=>{
    const id = req.params.id;
    const post = req.body;
    postDB
    .update(id, post)
    .then(result =>{
        if(!result) {
            return res.status(404).json({errorMessage: 'no post by that id'})
        } else {
            userDB.find(id).then(post=>{
                res.json(post);
            })
        }
    })
    .catch(err =>{
        return res.status(500).json({errorMessage: 'internal error'})
    })
})


server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    userDB
        .update(id, user)
        .then(result => {
            if (!result) {
                res.status(404).json({ errorMessage: 'no user by that id' })
            } else {
                userDB.find(id).then(user => {
                    res.status(200).json(user);
                })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'internal error' })
        })
})

// delete post or user

server.delete ('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  postDB
    .remove (id)
    .then (posts => {
      res.json (posts);
    })
    .catch (err => {
      res.status (500).json ({error: 'the post could not be retrieved'});
    });
});

server.delete ('/api/users/:id', (req, res) => {
  const id = req.params.id;
  userDB
    .remove (id)
    .then (users => {
      res.json (users);
    })
    .catch (err => {
      res.status (500).json ({error: 'the user could not be retrieved'});
    });
});


// get tags

server.get ('/api/tags/:id', (req, res) => {
    const id = req.params.id
  postDB
    .getPostTags (id)
    .then (tags => {
      res.json ( {tags} );
    })
    .catch (err => {
      res.status (500).json ({error: 'the tags could not be retrieved'});
    });
});

// get user posts
server.get('/api/users/posts/:id', (req, res) => {
    const id = req.params.id;

    userDB
        .getUserPosts(id)
        .then(tags => {
            res.json({ tags });
        })
        .catch(err => {
            res.status(500).json({ error: 'the tags could not be retrieved' });
        });
});
module.exports = server;