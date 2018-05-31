const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');

const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/tagDb.js')

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// const searchMiddleWare = (req, res, next) => {
//     if (!req.query.name) {
//       next();
//     }
//     users
//       .get()
//       .then(users => {
//         const { name } = req.query; 
//         const filteredUsers = users.filter(
//           user => user.name.toLowerCase() === name.toLowerCase()
//         );
//         req.users = filteredUsers;
//         next();
//       })
//       .catch(err => {
//         sendUserError(500, 'The users information could not be retrieved.', res);
//       });
// };

server.get('/', (req, res) => {
    res.send("Hello from express!");
})


// USERS
server.get('/api/users', (req, res) => {
    users
        .get()
        .then(user => {
            // console.log(user);
            if(!user){
                sendUserError(404, 'The user with specified id does not exist', res)
            } else{
                res.json(user);
            }
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the users', res)
        })
})

server.get('/api/users/:id', (req, res) => {
    users
        .get(req.params.id)
        .then(user => {
            console.log(user);
            if(!user){
                sendUserError(404, 'The user with specified id does not exist', res)
            } else{
                res.json(user);
            }
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the user', res)
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name){
        sendUserError(400, "Please provide a name for the user", res);
    }
    users
        .insert({ name })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            sendUserError(500, 'There was an error posting the user', res)
        })
})

//POSTS
server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(post => {
            // console.log(post);
            res.json({ post });
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the posts', res)
        })
})

server.get('/api/posts/:id', (req, res) => {
    posts   
        .get(req.params.id)
        .then(post => {
            console.log(post);
            if(!post){
                sendUserError(404, 'The post with specified id does not exist', res)
            } else{
                res.json({ post });
            }
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the post', res)
        })
})

server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if(!text || !userId){
        sendUserError(400, "Please provide text and a userId for the post", res);
    }
    posts
        .insert({ text, userId })
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            sendUserError(500, 'There was an error creating the post', res)
        })
})


//TAGS
server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tag => {
            // console.log(tag);
            res.json({ tag });
        })
})

server.get('/api/tags/:id', (req, res) => {
    tags   
        .get(req.params.id)
        .then(tag => {
            console.log(tag);
            if(!tag){
                sendUserError(404, 'The tag with specified id does not exist', res)
            } else{
                res.json({ tag });
            }
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the tag', res)
        })
})


server.listen(port, () => console.log(`Server is running on port ${port}`));