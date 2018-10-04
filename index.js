// imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb.js');
const db = require('./data/dbConfig.js');

// init server
const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan());
// speak in JSON
server.use(express.json());

function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`)

    next();
}

server.use(logger);

server.get('/', (req, res) => {
    res.send('Hello World!');
})


/*****************************************/
/*** MIDDLEWARE ***/
/*****************************************/

// Make username inputs capitalized
const allCapsName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

// Ensure ID passes as a Number type
const makeNumber = (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
}

/*****************************************/
/*** USER METHODS ***/
/*****************************************/
// Get All Users
server.get('/api/users', (req, res) => {
    userdb.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        return res.status(500).json({message: "Error getting users data."});
    })
})

// Get single user
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userdb.get(id)
    .then(user => {
        if(!user){
            return res.status(404).json({message: `User with ID ${id} does not exist.`})
        }
        return res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: `The user request could not be finished.`})
    })
})

// Get all posts from userID
server.get('/api/users/:id/posts', (req, res) => {
    const {id} = req.params;
    console.log(id);
    userdb.getUserPosts(parseInt(id))
    .then(userPosts => {
        console.log(userPosts);
        if(userPosts.length === 0){
            return res.status(404).json({message: `The user with ID ${id} has no posts.`})
        } else {
        return res.status(200).json(userPosts);
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'The request failed.'})
    })
})


// Create new user with name in all caps
server.post('/api/users', allCapsName, (req, res) => {
    const name = req.body;
    if(!name){
        res.status(400).json({message: "You must input a name."})
    }

    userdb.insert(name)
    .then(id => {
        const newUserID = id.id; 
        return userdb.get(newUserID)
        .then(user => {
            if(!user){
                return res.status(404).json({message: `The new user with ID ${newUserID} does not exist.`})
            }
            return res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: "Error adding new user."})
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error adding new user."})
    } )
})


// Delete user
server.delete('/api/users/:id', makeNumber, (req, res) => {
    const {id} = req.params;

    userdb.remove(parseInt(id))
    .then(reply => {
        if(!reply){
            return res.status(404).json({message: `The user with ID ${id} does not exist.`})
        }
        return res.status(200).json({message: `User ${id} successfully deleted.`});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: `Error deleting user with ID ${id}`})
    })
})

// Edit user method

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const newName = req.body;

    userdb.update(parseInt(id), newName)
    .then(user => {
        if(!user){
            return res.status(404).json({message: `The user with ID ${id} does not exist.`})
        }
        return userdb.get(id)
        .then(user => {
            if(!user) {
                return res.status(404).json({message: `The user with ID ${id} could not be found.`})
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: 'Error updating user.'})
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'Error updating user.'})
    })
})



/*****************************************/
/*** POSTS METHODS ***/
/*****************************************/

// Get all posts

server.get('/api/posts', (req, res) => {
    postdb.get()
    .then(posts => {
        return res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error getting posts data."})
    })
})

// Get single post

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    postdb.get(id)
    .then(post => {
        if(!post){
            return res.status(404).json({message: `Post with ID ${id} does not exist.`})
        }
        return res.status(200).json(post)
    })
    .catch(err => {
        console.log(err);   
        return res.status(500).json({message: "Failed to retrieve post."});
    })
})

// Add new post
server.post('/api/posts', (req, res) => {
    let newPost = {
        text: req.body.text,
        userID: req.body.userID
    }

    if(!newPost.text || !newPost.userID){
        return res.status(400).json({message: "You must input text and a userID."})
    }

    postdb.insert(newPost)
    .then(id => {
        const newPostID = id.id;
        return postdb.get(newPostID)
        .then(post => {
            if(!post){
                return res.status(404).json({message: `The post could not be found.`})
            }
            return res.status(201).json(`New post with ID ${newPostID} added successfully.`);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({message: "Error adding new post."})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Error adding new post."})
    })
    })
})

// Delete post
server.delete('/api/posts/:id', (req, res) => {
    let id = req.params.id;

    postdb.remove(parseInt(id))
    .then(reply => {
        if(!reply){
            return res.status(404).json({message: `The post with ID ${id} does not exist.`})
        }
        return res.status(200).json({message: `Post with ID ${id} deleted successfully.`})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "There was an error removing this post."})
    })
})

// Edit post

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const newText = req.body;

    postdb.update(parseInt(id), newText)
    .then(post => {
        if(!post){
            return res.status(404).json({message: `The post with ID ${id} does not exist.`})
        }
        res.status(200).json({message: `Post with ID ${id} updated successfully.`})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: 'Error updating post.'})
    })
})



/*****************************************/
/*** TAG METHODS ***/
/*****************************************/

// TODO

// write a function that will receive three or four arguments.
// add it to the middleware queue.

// Users
// id: number, no need to provide it when creating users, the database will generate it.
// name: up to 128 characters long, required.
// Posts
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.






const port = 8000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})