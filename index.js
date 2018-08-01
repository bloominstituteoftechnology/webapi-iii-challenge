//Q????: Configure an npm script named "start" that will execute your code using nodemon so that the server restarts on changes. Make nodemon be a development time dependency only, it shouldn't be deployed to production.

const express = require('express');
const server = express();
server.use(express.json());
 
let postDb = require('./data/helpers/postDb');
let tagDb = require('./data/helpers/tagDb');
let userDb = require('./data/helpers/userDb');

// so this one only returns the post id, text, and userId, while the get w/ :id returns the post text, postedBy, and tags (not id)...hmmm...
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            return res.send(posts) 
        })
        .catch(posts => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb.get(id)
        .then(posts => {
            return res.send(posts) 
        })
        .catch(posts => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})



// We use the .listen() method to have the express server monitor a port on the computer for any incoming connections and respond to those we have configured. 
server.listen(8000, () => console.log('API running on port 8000'));