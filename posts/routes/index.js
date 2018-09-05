const express = require('express');

const postDb = require('../../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get().then(posts => {
    res.status(200).json(posts);
  }).catch(err => {
    res.status(500).json({ message: 'Sorry - posts could not be fetched.'})
  })
});

router.get('/:id', (req, res) => {
  postDb.get(req.params.id).then(post => {
    if (post === undefined) {
      res.status(404).json({ message: 'Sorry - there is no post with that id'});
    }
    else {
      res.status(200).json(post);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry - we were unable to fetch the post you requested :('})
  });
})

router.post('/', (req, res) => {
  if (req.body.text) {
    postDb.insert(req.body).then(id => {
      res.status(201).json({ message: 'Your post was successfully created!'})
    }).catch(err => {
      res.status(500).json({ message: 'Sorry, your post could not be saved. Please try again!'})
    });
  }
  else {
    res.status(422).json({ message: 'Must have content to save the post'})
  }
});

router.put('/:id', (req, res) => {
  if (req.body.text) {
    postDb.update(req.params.id, req.body).then(count => {
      if (count !== 1) {
        res.status(404).json({ message: 'Sorry - the id you requested does not exist'});
      }
      else {
        res.status(201).json({ message: 'Your post has been successfully updated'});
      }
    }).catch(err => {
      res.status(500).json({ message: 'Sorry - your post could not be updated. Please try again!'})
    });
  }
  else {
    res.status(422).json({ message: 'Must have content to update the post'});
  }
})

router.delete('/:id', (req, res) => {
  postDb.remove(req.params.id).then(count => {
    if (count !== 1) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
    else {
      res.status(200).json({ message: 'The post was successfully deleted' });
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, we were unable to delete the specified post. Please try again!'})
  })
})

module.exports = router
