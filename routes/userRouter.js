const express = require('express');

const User = require('../data/helpers/userDb');

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const post = await User.get(req.query);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the hubs' });
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.getById(req.params.id);
  try {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the user' });
  }
});

router.post('/', async (req, res) => {
  const user = await User.insert(req.body);
  try {
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating User' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    if (updatedUser)
      res
        .status(200)
        .json({ message: `Updated user: ${updatedUser}`, userInfo: req.body });
    else res.status(404).json({ message: 'The user could not be found!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating User!' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  User.removeUserPosts(id)
    .then(() => {
      User.remove(id).then(results => {
        if (results) {
          res.status(200).json({ message: 'User Deleted' });
        } else {
          res.status(404).json({ message: 'Failed to delete user' });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: 'The user could not be removed',
      });
    });
});

// async function deleteUserposts(userPosts){
//     try{
//         userPosts.forEach(post => {
//             const deletedPost = await Post.delete(post.id);
//         })
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ message: 'Error removing the user posts' });
//     }
// }

module.exports = router;
