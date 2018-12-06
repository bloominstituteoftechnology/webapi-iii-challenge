const express = require('express');

const users = require('./data/helpers/userDb');

const nameMW = require('./middleware/capName');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 3333;

server.use(
    express.json(),
    nameMW.capName
    );

server.post('/api/users', (req, res) => {
    const {name} = req.body;
    if(!name){
        res.status(401).json({message:"could not add name"})
    }
    users.insert({name})
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(500).json({message:"error posting"})
    })
})

server.get('/', (req, res) => {
    res.json({message: "success"})
});

server.get('/api/users', (req, res) => {
    users.get()
    .then(getUser => {
        res.status(200).json(getUser);
    })
    .catch (err => {
        res.status(500).json({message: "user not found"})
    });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users.getUserPosts(id)
    .then(user => {
        if(user[0]){
            res.json(user);
        }
        else {
            res.status(404).json({message:"user does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message:"user could not be retrieved"})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "success"});
        } else {
            res.status(404).json({message:"could not delete"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"user could not be retrieved"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if(name){
        users.update(id, {name})
        .then(name => {
            if (name) {
                users.getUserPosts(id)
                .then(name => {
                    res.json(name);
                });
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage : 'user could not be retrieved'});
        });
}});

server.use('/api/posts', postRouter);

server.listen(PORT, err => {
    console.log(`server is listening on port ${PORT}`)
});