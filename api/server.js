//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const dbPost = require('../data/helpers/postDb.js');
const dbUser = require('../data/helpers/userDb.js');

const server = express();

server.use(express.json());


//posts
server.get('/api/posts', (req, res) => {
    dbPost.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.status(500).json({ error: "The posts could not be retrieved."})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    dbPost.get(id)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            res.status(500).json({ error: "The posts could not be retrieved." })
        })
})



//users
server.get('/api/users', (req, res) => {
    dbUser.get()
    .then(user => {
        res.json({ user })
    })
    .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved."})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    dbUser.get(id)
    .then(user => {
        res.json({ user })
    })
    .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved."})
    })
});

server.post('/api/users', async (req, res) => {
    const name = req.body;
    try {
        const new_user_id = await dbUser.insert(name);
        const user = await dbUser.get(new_user_id.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Unable to add name."})
    }
});

server.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await dbUser.get(id);
        const userId = await dbUser.remove(id);
        if (userId === 0) {
            res.status(404).json({ message: `There is not user with the id of ${id}`})
        } else {
            res.status(200).json({ message: `${user.name} has been deleted.`});
        }
    } catch (error) {
        res.status(500).json({ message: "things didnt go well"})
    }
    console.log(id)
})



// server.post('/api/users', async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: ''})
//     }
// })


module.exports = server;