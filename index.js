const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();
server.use(express.json());
const PORT = 4000;


server.get('/post', (req,res) => {
    postDb.get()
    .then(posts => {
    res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({error: "does not work"});
    });
});

server.get('/user', (req,res) => {
    userDb.get()
    .then(user => {
    res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: "does not work"});
    });
});

server.get('/user/:id', (req,res) => {
    const id = req.params.id;
    userDb.get(id)
    .then(user => {
    res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: "does not work"});
    });
});

server.get('/user/:id/post',(req, res) => {
    const id = req.params.id;
    userDb.getUserPosts(id)
    .then(user =>{
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({error: "please work"})
    });
    
});
server.get('/post/:id', (req, res) => {
    const id = req.params.id;
    postDb.get(id)
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post with id."})
          });

});
server.get('/user', (req, res) => {

    userDb.getPostTags()
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });

});
server.use((req, res, next) => {
    const name = req.body.name;
    if(name) {
        name.toUpperCase();
        req.body.name = name.toUpperCase();
    
    }
    next();
})

server.post('/post', (req,res) =>{
    const data = req.body;
    postDb.insert(data)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({message: "here we go again "})
    });
});
server.post('/user', (req,res) =>{
    const data = req.body;
    userDb.insert(data)
    .then(user =>{
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({message: "here we go again "})
    })
})
server.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    userDb.update(id, post)
          .then (update => {
            res.json(update)
          })
          .catch(err => {
              res.status(500).json({error: "Can't be modified."})
          });

});
server.put('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    postDb.update(id, post)
          .then (update => {
            res.json(update)
          })
          .catch(err => {
              res.status(500).json({error: "Can't be modified."})
          });

});

server.delete('/post/:id', (req, res) => {
    const id = req.params.id;

    postDb.remove(id)
          .then (remove => {
            res.status(200).json(remove)
          })
          .catch(err => {
              res.status(500).json({error: "Can't remove the post."})
          });

});

server.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
          .then (remove => {
            res.status(200).json(remove)
          })
          .catch(err => {
              res.status(500).json({error: "Can't remove the post."})
          });

});


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})