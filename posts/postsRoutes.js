const express = require('express');
const db = require('../data/helpers/postDb');
const router = express.Router();

router.get('/', (req, res) => {
    db.get().then(posts => {
        res.json(posts);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(post => {
          if(!post) {
              return res.status(404).send({message: `no post with id of ${id}`});
          }
          res.json(post.text);
      })
      .catch(err => console.error(err))
});

router.post('/:userId', (req, res) => {
    const { text } = req.body;
    const newPost = { text };
    db.insert(newPost)
      .then(userId => {
          const { id } = userId;
        db.get(id)
          .then(post => {
              if(!post){
                  return res.status(400).send({errorMessage: "Please provide text"})
              }
              res.status(201).json(post)
          });
      }) 
      .catch(err => console.error(err))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(removePost => {
         console.log(removePost);
         res.status(200).json(removePost);
      })
      .catch(err => console.error(err))
    res.send(req.params);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const newPost = { text };
    db.update(id, newPost)
      .then(post => {
          res.status(200).json(post)
      })
      .catch(err => console.error(err));
});

module.exports = router;