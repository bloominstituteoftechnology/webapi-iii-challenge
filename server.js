const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./users/userRoutes');

const tagDb = require('./data/helpers/tagDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('API running');
});

server.use('/api/users', userRoutes);



server.get('/api/posts', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { 
            res.status(500).json({ error: "The post information could not be found." });
        });
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
        .get(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { 
            res.status(500).json({ error: "The post information could not be found." });
        });
})

server.get('/api/posts/:id/tags', (req, res) => {
    const id = req.params.id;
    postDb
        .getPostTags(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { 
            res.status(500).json({ error: "The post information could not be found." });
        });
})

server.post('/api/posts', (req, res) => {
    const text = req.body;
    postDb
        .insert(text)
        .then(posted => {
            res.json(posted);
        })
    .catch(err => { 
        res.status(500).json({ error: "The post information could not be created." });
    });
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
       .remove(id)
       .then(posts => {
           res.json(posts);
       })
       .catch(err => { 
        res.status(500).json({ error: "The post could not be removed." });
    });
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const text = req.body;
    postDb
        .update( id, text )
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { 
            res.status(500).json({ error: "The post could not be updated." });
        });
})

server.get('/api/tags', (req, res) => {
    tagDb
        .get()
        .then(tags => {
            res.json(tags);
        })
        .catch(err => { 
            res.status(500).json({ error: "The tag information could not be found." });
        });
})

server.get('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb
        .get(id)
        .then(tags => {
            res.json(tags);
        })
        .catch(err => { 
            res.status(500).json({ error: "The tag information could not be found." });
        });
})

server.post('/api/tags/:id', (req, res) => {
    const tag = req.body;
    tagDb
        .insert(tag)
        .then(tagged => {
            res.json(tagged);
        })
        .catch(err => { 
            res.status(500).json({ error: "The tag information could not be created." });
        });
})

server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb
       .remove(id)
       .then(tags => {
           res.json(tags);
       })
       .catch(err => { 
        res.status(500).json({ error: "The tag could not be removed." });
    });
})

server.put('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    tagDb
        .update( id, tag )
        .then(tags => {
            res.json(tags);
        })
        .catch(err => { 
            res.status(500).json({ error: "The tag could not be updated." });
        });
})

server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'));