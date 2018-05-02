// import your node modules
const cors = require('cors');
const postDb = require('./data/helpers/post.Db');
const tabDb = require('./data/helpers/tagDb.Db');
const userDb = require('./data/helpers/userDb.Db');

const express = require('express');
const db = require('./data/db.js');
const server = express();


// Adding Middleware:
server.use(express.json());

// Route Handlers
// Post a Post 

server.post('/api/posts', (request, response) => {
    const id = request.params.id;
    let title = request.body.title;
    let contents = request.body.contents;
    let post = { title, contents };

    db
        .insert(post)
        .then(post => {
            response.status(201);
            response.json(post);
        })
        .catch(error => {
            if (!title || !contents) {
                response.status(400);
                response.json({ errorMessage: 'Please provide title and contents.' })
            }
            response.status(500);
            response.json({ error: 'There was an error while saving the post to the database.' })
        })

});