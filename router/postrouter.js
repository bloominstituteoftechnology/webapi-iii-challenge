const express = require('express');
const router = express.Router();
const podb = require('../data/helpers/postDb');

router.get('/', async (req, res) => {
  try {
    const post = await podb.get(req.query);
    res.status(200).json(post);
  } catch (error) { 
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
})
// get a post by id
router.get('/:id',async (req, res) =>{
  try {
    const id = await podb.getById(req.params.id);
    
    if (id) {
      res.status(200).json(id);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  }catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub'
  })
  }
})

// add a new post
router.post('/', async (req, res) => {
  try {
    const post = await podb.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});
// update an existing post 
router.put('/:id', async (req, res) => {
  try {
    const id = await podb.update(req.params.id, req.body);
    if (id) {
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const post = await podb.remove(req.params.id);
    if (post) {
      res.status(200).json({ message: 'The post has been removed' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});





// module.exports = {
//   get,
//   getById,
//   insert,
//   update,
//   remove,
// };

module.exports = router;