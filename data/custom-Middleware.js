

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userDb = require('../data/helpers/userDb')
const postDb = require('../data/helpers/postDb')
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));





server.get('/post', (req, res) => {
    postDb.get()
          .then (posts => {
            res.status(200).json(posts)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
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


server.post ('/post', (req, res) => {
    const {text, userId} = req.body
    postDb.insert({text, userId})
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't post it!"})
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



server.get('/post', (req, res) => {

    postDb.getPostTags()
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });

});





server.get('/user', (req, res) => {
    userDb.get()
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });

});



server.get('/user/:id', (req, res) => {
    const id = req.params.id;
    userDb.get(id)
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post with id."})
          });

});



server.post ('/user', (req, res) => {
    const {text, userId} = req.body;
    userDb.insert({text, userId})
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });


});



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



server.get('/user', (req, res) => {

    userDb.getPostTags()
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });

});



module.exports = server;