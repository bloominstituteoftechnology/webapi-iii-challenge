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
            console.log(user);
            res.json({ user })
        })
        .catch(err => {
            sendUserError(500, 'There was an error finding the users', res)
        })
})


//POSTS
server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(post => {
            console.log(post);
            res.json({ post });
        })
        .catch(err => {
            sendUserError(500, 'There was an error retrieving the posts', res)
        })
})


//TAGS
server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tag => {
            console.log(tag);
            res.json({ tag })
        })
})



server.listen(port, () => console.log(`Server is running on port ${port}`));