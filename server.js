// Imports node modules
const express = require('express');

const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const userRoutes = require('./userRoute');
// Server setup
const server = express();


// Add middleware
server.use(express.json());
server.use('/api/users', userRoutes)

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
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

// PUT method for post
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;

    postDb
    .update(id, post)
    .then(response => {
        res.status(200).json({ post })
    .catch(err => {
        res.status(500).json({ Error: err })
        })
    })
})

// Retrieve List of Tags for a Post
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb
    .getPostTags(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(error => {
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
server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    let tagDeleted;

    tagDb
    .get(id)
    .then(tag => {
        tagDeleted = { ...tag }
    })

    tagDb
    .remove(id)
    .then(response => { 
        res.status(200).json({ tagDeleted })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// PUT method for tag
server.put('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    tagDb
    .update(id, tag)
    .then(response => {
        res.status(200).json({ tag })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})


// Server attached to a port

const port = 5000;
server.listen(port, () => {console.log(`Server is listening in port: ${port} `)})