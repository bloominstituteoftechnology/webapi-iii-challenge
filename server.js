const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/tagDb.js')
const express = require('express');
const cors = require('cors');
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

//users
// server.get('/api/users', (req, res) => {
//     users
//     .get()
//     .then(users => {
//         res.json({ users })
//     })
//     .catch(error => {
//         res.status(500)
//         res.json({ message: "The posts information could not be retrieved." })
//     }) 
// })
// server.get('/api/users/:id', (req, res) => {

// })
// server.post('/api/users', (req, res) => {
    
// })
// server.put('/api/users/:id', (req, res) => {
    
// })
// server.delete('/api/users/:id', (req, res) => {
    
// })


//posts
server.get('/api/posts', (req, res) => {
    posts 
    .get()
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The posts information could not be retrieved." })
    })
})   
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if(req.params.id == undefined) {
        res.status(404)
        res.json({ message: "The post with the specified ID does not exist." })
    }
    else {
        console.log(id);
        posts
        .get(id)
        .then(post => {
            res.json({ post })
        })
        .catch(error => {
            res.status(500)
            res.json({ message: "The post information could not be retrieved." })
        })
    }})  
server.post('/api/posts', (req, res) => {
const { text, userId } = req.body;
if(text == undefined || userId == undefined) {
    user.status(404)
    user.json({ message: "The post with the specified ID does not exist." })
} 
else {
    posts
    .insert({ text, userId })
    .then(post => {
        res.json({ post })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The post information could not be retrieved." })
    })
}})
server.put('/api/posts/:id', (req, res) => {
    const { text, userId } = req.body;
    const { id } = req.params;
        posts
        .update(req.params.id, req.body)
        .then(post => {
            if (!post) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." })
            } 
            else {
                res.json({ post })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The post information could not be modified."});
        })
})
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    if(id == undefined) {
        res.status(400);
        res.json({ errorMessage: "The post with the specified ID does not exist." })
    }
    else {
        posts
        .remove(id)
        .then(post => {
            if (!post) {
                res.status(404);
                res.json({ message: "The user with the specified ID does not exist." })
            } 
            else {
                res.json({ post })
            }
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The user could not be removed" })
        })
}})


//tags
// server.get('/api/tags', (req, res) => {
//     tags
//     .get()
//     .then(tags => {
//         res.json({ tags })
//     })
//     .catch(error => {
//         res.status(500)
//         res.json({ message: "The posts information could not be retrieved." })
//     })    
// })
// server.get('/api/tags/:id', (req, res) => {
    
// })
// server.post('/api/tags', (req, res) => {
    
// })
// server.put('/api/tags/:id', (req, res) => {
    
// })
// server.delete('/api/tags/:id', (req, res) => {
    
// })




server.listen(port, () => console.log(`Server running on port ${port}`));