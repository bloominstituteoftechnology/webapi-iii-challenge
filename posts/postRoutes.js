const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();


router.get('/', (req, res) => {
  postDb.get()
    .then(posts => {
      console.log('\n=== POSTS FOUND!! ==\n', posts)
      res.json(posts);
    }).catch (err => {
      console.log('\n=== I CANNOT GET THE POSTS!! ==\n', err)
      res
        .status(500)
        .send({ error: "The posts could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb.get(id)
    .then(post => {
      console.log('\n=== POST FOUND!! ==\n', post)
      res.json(post);
    })
    .catch(err => {
      console.log('\n=== I CANNOT GET THE POST!! ===\n', err)
      res.json({ error: "The post could not be retrieved."})
    })
})


router.post('/', (req, res) => {
  console.log("req", req.body)
  if(!req.body.userId) {
      res.status(400).json({ error: "Please provide a userId for this post."
    })
  } else if (!req.body.text) {
    return res.status(400).json({ error: "Please enter some text for this post."
    })
  } else {
  postDb.insert(req.body)
    .then(response => {
          console.log('\n=== POST ADDED ===\n', response);
          res.status(201).json(response);
        })
    .catch(err => {
      console.log('\n=== CANNOT ADD POST ==\n', err);
      res.status(500).json({ error: 'There was an error while saving this post to the database.'});
    });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!req.body.userId) {
    res.status(400).json({ error: "Please enter a userId." })
  } else if (!req.body.text) {
    res.status(400).json({ error: "Please enter some text." })
  } else {
    postDb
    .update(id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: "There is no post with that id."})
      }
      if (response === 1) {
        console.log("\n=== POST UPDATED ==\n", response, req.body)
        res.status(200).json(response)
      }
    })
    .catch(err => {
      console.log("\n=== CANNOT UPDATE POST ===\n", err)
      res.status(500).json({ error: "There was an error while updating this post." })
    })  
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  postDb.remove(id)
    .then(response => {
      if (response === 0){
        res.status(404).json({ error: "There is no post with that id."})
      }
      if (response === 1){
        console.log("\n=== POST DELETED ===\n", response)
        res.status(200).json({response})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "There was an error while deleting this POST."})
    })
})

module.exports = router;