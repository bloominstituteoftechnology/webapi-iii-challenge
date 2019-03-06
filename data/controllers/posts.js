const express = require('express');

const posts = require('../helpers/postDb.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({err: message });
}

server.get('/', (req,res) => {
  posts
    .get()
    .then(foundPosts => {
      res.json(foundPosts);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
});

server.get('/:id', (req,res) =>{
  const { id } = req.params;
  posts
    .getById(id)
    .then(post => {
      if (post === 0){
        return errorHelper(404, 'No post found', res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
});

server.post('/', (req,res) => {
  const { user_id, text } = req.body;
  posts
    .insert({user_id, text})
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server', res);
    });
});

server.delete('/:id', (req,res) => {
  const { id } = req.params;
  posts
    .remove(id)
    .then(response => {
      if (response === 0){
        return errorHelper(404, 'No post found', res);
      }
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
})

server.put('/:id', (req,res) => {
  const {id} = req.params;
  const { text } = req.body;
  posts
    .update(id, { text })
    .then(response => {
      if (response === 0){
        return errorHelper(404, 'No post by that id');
      } else {
        posts.getById(id).then(post => {
          res.json(post);
        });
      }
    })
    .catch(err => {
      return errorHelper(500, 'Internal server error', res);
    });
})



module.exports = server;
