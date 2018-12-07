const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router()

// /api/posts/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params
    postDb
    .get(userId)
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.status(500)
      .send({ message: 'unable retrieve posts.' });
    });
});

// /api/posts/
// router.post('/', (req, res) => {
//   const post = req.body;
//   if (post.text && post.postedBy) {
//     postDb
//       .insert(post)
//       .then(idInfo => {
//         postDb.get(idInfo.id)
//         .then(post => {
//           res
//             .status(201)
//             .json(idInfo);
//         });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ message: 'failed to insert post in db' });
//       });
//   } else {
//     res
//       .status(400)
//       .json({ errorMessage: 'please provide text and postedBy for post' });
//   }
// });

module.exports = router;
