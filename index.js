const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');
const middleware = require('./middleware.js')
const server = express();
const NUM = 4444;

server.use(
    express.json(),
    middleware.UPPERCASE
);


server.get('/api/users', (req,res) => {
    userDB.get()
    .then((users) => {res.json(users)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get users'})})
} )

server.get('/api/posts', (req,res) => {
    postDB.get()
    .then((posts) => {res.json(posts)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get posts'})
    })
})

server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;

    userDB.get(id)
    .then( user => {
        if (user) {res.json(user)}

        else { 
            res
            .status(404)
            .json({message:"The user with the specified ID does not exist."})}
    })
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get user"})
    })
})

server.get('/api/posts/:id', (req,res) => {
    const {id} = req.params;

    postDB.get(id)
    .then( post => {
        res.json(post)

    })
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
})

server.post('/api/users', (req,res) => {
    const user = req.body;
    console.log(user)
    if (user.name){
        userDB.insert(user)
    .then(info => {
        userDB.get(info.id).then(response => {
            res
            .status(201)
            .json(response)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get user"})
    })
    }

    else {
        res
        .status(400)
        .json({message: "missing name"})
    }
    
})

server.post('/api/posts', (req,res) => {
    const post = req.body;
    if (post.text && post.userID){
        postDB.insert(post)
    .then(info => {
        postDB.get(info.id).then(response => {
            res
            .status(201)
            .json(response)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
    }

    else {
        res
        .status(400)
        .json({message: "missing text or user id"})
    }
    
})

server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;
    userDB.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "User deleted"})}

        else {
            res
            .status(404)
            .json({message: "User with this ID does not exist."})
        }

    })
    .catch(err => {
        res
        .status(500)
        .json({message: "User could not be deleted"})
    })
})

server.delete('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    postDB.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "Post deleted"})}

        else {
            res
            .status(404)
            .json({message: "Post with this ID does not exist."})
        }

    })
    .catch(err => {
        res
        .status(500)
        .json({message: "Post could not be deleted"})
    })
})

server.put('/api/users/:id', (req,res) => {
    const user = req.body;
    const {id} = req.params;
    if (user.name) {
        userDB.update(id, user)
        .then(count => {
            if (count) {
                userDB.get(id).then( data => {
                    res.json(data)}
                )
            }

            else { res
                .status(404)
                .json({message:"The user with the specified ID does not exist."})}
        })
        .catch(
            err => {
                res
                .status(500)
                .json({error: "The user could not be updated"})
            }
        )

    }

    else {
        res
        .status(400)
        .json({message: "missing name"})
    }

})

server.put('/api/posts/:id', (req,res) => {
    const post = req.body;
    const {id} = req.params;
    console.log(id)
    if (post.text) {
        postDB.update(id, post)
        .then(count => {
            if (count) {
                postDB.get(id).then( data => {
                    res.json(data)}
                )
            }

            else { res
                .status(404)
                .json({message:"The post with the specified ID does not exist."})}
        })
        .catch(
            err => {
                res
                .status(500)
                .json({error: "The post could not be updated"})
            }
        )

    }

    else {
        res
        .status(400)
        .json({message: "missing text"})
    }

})

server.listen(NUM, () => console.log(`listening on port ${NUM}`))