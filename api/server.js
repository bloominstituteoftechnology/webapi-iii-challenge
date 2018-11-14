

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userDb = require('../data/helpers/userDb')
const postDb = require('../data/helpers/postDb')
const server = express();

server.get('/post', (req, res) => {
    postDb.get()
          .then (post => {
            res.status(200).json(post)
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
    const {text, id}
    postDb.insert()
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the post."})
          });

});

server.put('/post/:id', (req, res) => {
   const id = req.params.id;
    const post = req.body;
    postDb.update(id, post)
          .then (count => {
            res.json(count)
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



// const uppercase = (req, res, next) => {
//     const {name} = req.params;
//     if()
// }

module.exports = server;