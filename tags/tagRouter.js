const express = require('express');
const tagDb = require('../data/helpers/tagDb');
const router = express.Router();


router.get('/', (req, res) => {
  tagDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The tags could not be retrieved."
        });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(user => {
      if (user === 0) {
        res.status(404).json({ error: 'No user by that Id in the DB'}, res);
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Server Error' }, res);
    });
});


// router.get('/posts/:userId', (req, res) => {
//   const { userId } = req.params;
//   tagDb
//     .getUserPosts(userId)
//     .then(usersPosts => {
//       if (usersPosts === 0) {
//         return errorHelper(404, 'No posts by that user', res);
//       }
//       res.json(usersPosts);
//     })
//     .catch(err => {
//       return errorHelper(500, 'Database boof', res);
//     });
// });

router.post('/', async (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  try {
    const tagData = req.body;
    const tagId = await tagDb.insert(tagData);
    res.status(201).json(tagId);
  } 
  catch (error) {
    res.status(500).json({
      error: "There was an error while saving the id to the database",
      error
    })
  }
});

router.put('/:id', (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  const changes = req.body;
  const { id } = req.params;
  tagDb.update(id, changes).then(count =>
    res.status(200).json(count)
  ).catch(error => {
    res.status(500).json({
      message: 'error updating post',
      error
    })
  })
});

router.delete('/:id', (req, res) => {
  tagDb.remove(req.params.id).then(count => {
    res.status(200).json(count)
  }).catch(error => {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
      error
    })
  })
});


module.exports = router;