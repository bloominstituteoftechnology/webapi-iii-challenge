//Set up
const express = require('express'); 
const cors = require('cors'); 
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 8000;
const server = express(); // variable server calls express
// server.use(cors({origin: 'http://localhost:xxxx'}));
server.use(express.json()); //extending middleware into our server

// Returns an array of all the post objects contained in the database.
// When the client makes a GET request to /api/posts:
// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

server.get('/api/users', (req, res) => {
    users.get()
    .then(posts => {
        res.json(posts);
    })
});
// server.get('/api/users')
// server.get('/api/posts')
// server.get('/api/tags')```

//Set up
    // server object: we have inialized it with our express server
server.listen(port, () => console.log(`Server running on port ${port}.`));