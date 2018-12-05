// create an express server
const express = require('express'); //inside package.json dependencies
const helmet = require('helmet');
const logger = require('morgan');

const db = require('./data/helpers/userDb.js')
const db2 = require('./data/helpers/postDb.js')

// manage persistence of users and posts data


const server = express();
const PORT = 6000;

// middleware
server.use(
    express.json(),
    logger('dev'),
    helmet(),

);

// route handlers - users

// this is simply to make sure the server is working
// server.get('/entrance', (req, res) => {
//     res.status(404).json({message: 'request receive, welcome Paul 2!', id: null, name: 'Paul Hans'});
// });

/////////////// USER //////////////////


//If you pass an id to db.get() it will return the resource with that id if found.
server.get('/api/users', (req, res) => {
    db.get()                          //userDb.js has get() method, see ReadME
    .then((users) => {
        res.json(users);
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Users information could not be retrieved."})
    });
});

// get all USER POSTSs


server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;     //define user id
    db.getUserPosts(id)         //getUserPosts takes in user id as argument
    .then((user) => {
        if(user){
            res.json(user);
        } else {
            res 
            .status(404)
            .json({message: "The user with the specified ID cannot be found."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "User's posts could not be retrieved."})
    })
})


// continue USER server calls
server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('users from body', user)

    if (user.name) {

        db.insert(user).then(idInfo => {
            db.get(idInfo.id).then(user => {   //pass id into get()
                res.status(201).json(user);
            });
        }).catch(err => {
            res 
            .status(500)
            .json({message: "failed to insert user in database"})
        });

    } else {
        //added layer of assurance that a more specific error message is provided
        res.status(400).json({message: "status 400: missing user name"})
    }
});


// continue USER server calls
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(count => {   //doc says remove() returns 'number' of users (resources) deleted
        if (count) {
            res.json({message: "successfully deleted user"});
        } else {
            res 
                .status(404)
                .json({message: "invalid id"});
        }
    }).catch(err => {
        res 
            .status(500)
            .json({message: "fail to delete user"});
    })
})



// continue USER server calls
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;
    //combination of GET, POST, DELETE
    if (user.name) {

    db.update(id, user)   //accepts two arguments, id of resource to update & object with changes to apply
    .then(count => {
        if (count) {
            //200 successfully updated (send back updated user)
            db.get(id).then(user => {
                res.json(user);
            });
        } else {
            //404 invalid id
            res 
            .status(404)
            .json({message: "invalid id"});
        }
    })
    .catch(err => {
        //500 catch-all, something else went wrong
        res 
        .status(500)
        .json({message: 'something went wrong, fail to update user'})
    })

    } else {
        //400 error name is missing
        res.status(400).json({message: "status 400: missing user name"})
    }
});

/////////////// POST //////////////////


//POST server call - GET
server.get('/api/posts', (req, res) => {
    db2.get() 
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Posts information could not be retrieved."})
    });
});

//POST server call - POST
server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log('posts from body', post)

    if (post.userId && post.text) {

        db2.insert(post).then(idInfo => {   // there's id vs userId per Post
            db2.get(idInfo.id).then(post => {
                res.status(201).json(post);
            });
        }).catch(err => {
                res 
                .status(500)
                .json({message: "failed to insert post in database"})
        });

    } else {
        //added layer of assurance that a more specific error message is provided
        res.status(400).json({message: "status 400: missing post userId and text"})
    }
});

//POST server call - DELETE
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db2.remove(id).then(count => {  //doc says remove() returns 'number' of post (resources) deleted
        if (count) {
            res.json({message: "successfully deleted post"})
        } else {
            res 
                .status(404)
                .json({message: "invalid id"});
        }   
    }).catch(err => {
        res 
            .status(500)
            .json({message: "fail to delete post"});
    })
})

//POST server call - UPDATE
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;
    // combination of GET, POST, DELETE
    if (post.userId && post.text) {

    db2.update(id, post)    //accepts two arguments, id of resource to update & object with changes to apply
    .then(count => {
        if(count){
            //200 successfully update (send back updated post)
            db2.get(id).then(post => {
                res.json(post);
            });
        } else {
            //404 invalid id
            res 
            .status(404)
            .json({message: "invalid id"});
        }
    })
    .catch(err => {
        //500 catch-all, something else went wrong
        res 
        .status(500)
        .json({message: "something went wrong, fail to update post"})
    })

    } else {
        //400 error userId & text are missing
        res.status(400).json({message: "status 400: missing userId and text"})
    }
});





// listen
server.listen(PORT, err => {
    console.log(`server is up and running on ${PORT}`);
})