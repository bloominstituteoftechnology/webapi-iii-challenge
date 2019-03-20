
const express = require('express');
const router = express.Router();
const usdb = require('../data/helpers/userDb')

// var myCaps = function (req, res, next) {
 
//   next()
// }

// get a list of users
router.get('/', async (req, res) => {
  try {
   
    const user = await usdb.get(req.query);
    res.status(200).json(user);
  } catch (error) { 
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Users',
    });
  }
})
// get a user by id
router.get('/:id',async (req, res) =>{
  try {
    const id = await usdb.getById(req.params.id);
    
    if (id) {
      res.status(200).json(id);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub'
  })
  }
})
// get a users post by id
router.get('/:id/posts',async (req, res) =>{
  try {
    const id = await usdb.getUserPosts(req.params.id);
    
    if (id) {
      res.status(200).json(id);
    } else {
      res.status(404).json({ message: 'User posts not found' });
    }
  }catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts'
  })
  }
})
// add a new user
router.post('/', async (req, res) => {
  try {
    const user = await usdb.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the User',
    });
  }
});
// update an existing user 
router.put('/:id', async (req, res) => {
  try {
    const id = await usdb.update(req.params.id, req.body);
    if (id) {
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const user = await usdb.remove(req.params.id);
    if (user) {
      res.status(200).json({ message: 'The user has been removed' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});




///module.exports = {
//   get,
//   getById,
//   getUserPosts,
//   insert,
//   update,
//   remove,
// };
module.exports = router;