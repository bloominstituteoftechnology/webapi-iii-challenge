const userDB = require('./helpers/userDb.js');
const postDB = require('./helpers/postDb.js');
const tagDB = require('./helpers/tagDb.js');
const express = require('express');
const cors = require('cors');

const port = 5865;
const server = express();
server.use(express.json());
server.use(cors.json());


/*
Battle Plan:
get:       /api/users           |       list of users --Done
get:       /api/users/:id       |    a user matching ID
post:     /api/users            |    add a user to the users table
delete:    /api/users/:id       |    delete a user from the users table based on the ID

get:       /api/posts           |       list of posts
get:       /api/posts/:id        |    a post matching ID
post:     /api/posts            |    add a post to the posts table
delete:    /api/posts/:id        |    delete a post from the posts table based on the ID

get:       /api/tags               |       list of tags
get:       /api/tags/:id        |    a tag matching ID
post:     /api/tags            |    add a tag to the tags table
delete:    /api/tags/:id        |    delete a tag from the tags table based on the ID

get:    /api/postsbyid/:id    |    lists of posts by a speciffic user ID
get:    /api/posttags/:id    |    a list of tags by a speciffic post ID

*/

//get: /api/users | list of users
server.get('/api/users', (req, res) => {
    userDB
            .find()
            .then(users => {
                res.json({ users });
            });
});

//get: /api/users/:id | a user matching ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    userDB
            .findById(id)
            .then(users => {
                if (users.length === 0) {
                    userError(404, "That User ID does not exist", res);
                    return;
                }
                res.send(users);
            });
});

server.listen(port, () => console.log(`Server running on port ${port}`));