const express = require('express');

const PostData = require('../helpers/postDb.js');

const router = express.Router();



// GET

router.get('/', async (req, res) => {
  try {
      const posts = await PostData.get(req.query);
      res.status(200).json(posts);
  } catch (error) {
     // log error to database
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {

        const post = await PostData.getById(req.params.id);

        if (post) {
          res.status(200).json(post);
      } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The post information could not be retrieved." });
  } 
});

//POST

router.post('/', async (req, res) => {

  if (!req.body.text || !req.body.user_id) {
     res.status(400).json({ errorMessage: "Please provide user id and text for the post."});
 } else {    
     try {
         const user = await PostData.insert(req.body);
         res.status(201).json(user);
     } catch (err) {
      res.status(500).json({error: "There was an error while saving the post to the database."});
    }
 }


});


//PUT (Update)

router.put('/:id', async (req, res) => {

  if (!req.body.text || !req.body.user_id) {
     res.status(400).json({ message: "Please provide user id and text for the post." });
 } else {  
     try {
         const post = await PostData.update(req.params.id, req.body);

          if (user) {
             res.status(200).json(post);
         } else {
             res.status(404).json({ message: "The user with the specified ID does not exist." });
         }
     } catch (error) {
         // log error to database
         console.log(error);
         res.status(500).json({ error: "The user information could not be modified." });
     }
 }
});



 //DELETE

 router.delete('/:id', async (req, res) => {
  try {
      const post = await PostData.remove(req.params.id);

       if (post > 0) {
          res.status(200).json({ message: "The post has been removed" });
      } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
  }
});



module.exports = router;