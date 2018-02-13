const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

const users = [];
let userId = 0;

app.get('/', (req, res) => {
     res.send('<h1>User Home</h1>');
});

// [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)

app.post('/users', (req, res) => {
    if(req.body.user) {
    users[req.body.user] = userId;
    users.push(req.body.user);
    res.send(userId + '');
    userId++;
    } else {
        res.send('Error: Must provide user information in the body');
    }
})

// app.post('/users/:user', (req, res) => {
//     const user = req.params.user
//     users.push(user);
//     res.send(users);
// });

// [GET] `/users` This route will return an array of all users.

app.get('/users', (req, res) => {
    if (users.length > 0) return res.send(users);
    res.send('No users present')
})


// [GET] `/users/:id` This route will return the user with the matching `id` property.

app.get('/users/:id', (req, res) => {
    if(req.params.id) {
    res.send(users[req.params.id]);
    } else {
        res.send('Error: Must provide id parameter')
    }
    // const id = users[req.params.userId];
    // res.send(id);
})


// [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user you are searching for.  Return an array of all users whose names match the name provided.  This search should not be case sensitive.

app.get('/search', (req, res) => {
    if(req.query.name) {
    const name = req.query.name.toLowerCase();
    const search = users.map(user => user.toLowerCase()).filter(user => user.includes(name))
    res.send(search);
    } else {
        res.send('Error: Must provide a search query')
    }
});

// [DELETE] `/users/:id` This route should delete the specified user.

app.delete('/users/:id', (req, res) => {
    if(req.params.id) {
    users.splice(parseInt(req.params.id), 1);
    res.send('User Deleted');
    } else {
        res.send('Error ID does not exist')
    }
  });

// Your user objects can take any form.  Just ensure that they have an `id` property.  You can generate this `id` property on the server any way you like.

app.listen(PORT, err => {
    if(err) {
        console.log(`There was an error start the server: ${err}`)
    } else {
    console.log(`SErver listening on port ${PORT}`);
    }
})
