// Imports node modules
const express = require('express');

const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
// Server setup
const server = express();


// Add middleware
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
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