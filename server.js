// Imports node modules
const express = require('express');

const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

// Server setup
const server = express();


// Add middleware
server.use(express.json());

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
})

// --------USER--------

// GET method for user
server.get('/api/users', (req, res) => {

    userDb
    .get()
    .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
}) 

// POST method for user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json({ userInfo })
    })
    .catch( err => {
        res.status(500).json({ Error: err })
    })
})

// DELETE method for user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    let userDeleted;

    userDb
    .get(id)
    .then(user => {
        userDeleted = { ...user }
    })


    userDb
    .remove(id)
    .then(response => {
        console.log(userDeleted)
        res.status(200).json({ userDeleted })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// --------POST--------

// GET method for post
server.get('/api/posts', (req, res) => {

    postDb
    .get()
    .then(response => {
       res.status(200).json({ response });
   })
   .catch(err => {
       res.status(500).json({ Error: err });
   })
})

// POST method for post
server.post('/api/posts', (req, res) => {
    const postInfo = req.body;

    postDb
    .insert(postInfo)
    .then(response => {
        res.status(201).json({ postInfo })
    })
    .catch( err => {
        res.status(500).json({ Error: err })
        }
    )
})

// DELETE method for post
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb
    .remove(id)
    .then(response => {
        res.status(200).json(`${response} post deleted`)
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})


// --------TAG---------
// GET method for tag
server.get('/api/tags', (req, res) => {
   tagDb
   .get()
   .then(response => {
       res.status(200).json({ response });
   })
   .catch(err => {
       res.status(500).json({ Error: err });
   })
})

// POST method for tag
server.post('/api/tags', (req, res) => {
    const tagInfo = req.body;

    tagDb
    .insert(tagInfo)
    .then(response => {
        res.status(201).json({ tagInfo })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// DELETE method for tag
// server.delete('/api/tags/:id', (req, res) => {
//     const deletedTags = req.params.id;

//     tagDb.remove(id).then(response => {
        
//     }).catch()
// })

// Server attached to a port

const port = 5000;
server.listen(port, () => {console.log(`Server is listening in port: ${port} `)})