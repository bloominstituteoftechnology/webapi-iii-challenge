const express = require('express');
const postDb = require('../data/helpers/postDb.js')
const router = express.Router();

   // posts

   router.get('/', (req, res) => {
    postDb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.error('error',err);

        res.status(500).json({ message:'Error getting the posts'});
    })
});

router.get('/:id', (req, res) => {
    postDb.get(req.params.id).then(post => {
      console.log(post);
      if (post.length === 0) {
        res.status(404).json({  message: 'The post with the specified ID does not exist.' });
      }
      else {
        res.status(200).json(post)
    }}).catch(err => {
      console.error('error', err);
       res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
  });

  router.post('/', (req, res) => {
      if(!req.body.title || !req.body.contents){
          res.status(400).json({errorMessage: 'Please provide title and contents for post.'})
      }
      postDb.insert(req.body).then(id => {
          res.status(201).json(id)
      }).catch(err => {
          console.error('error',err);
          res.status(500).json({error: 'There was an error while saving the post to the database.'})
      })
  });

  router.delete('/:id', (req, res) => {
      const { id } = req.params;

      postDb.remove(id)
      .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist"});
        } else {res.status(200).json(posts);
        }
      })
      .catch(err => {
          res.status(500).json({error: "The post could not be removed"});
      })
  });



  router.put('/:id', (req, res) => {
    postDb.update(req.params.id, req.body).then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));
})

module.exports = router;