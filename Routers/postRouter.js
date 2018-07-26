const express = require('express')
const postDB = require('../data/helpers/postDb')

const postRouter = express.Router();


/**
 *   GET posts
 */
postRouter.get('/', async (req,res) =>{
  try{
    const posts = await postDB.get()

    //If post length is > 0 send posts otherwise error
    posts.length > 0 ? res.status(200).json(posts) : 
     res.status(404).json({ message: "The users information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The users information could not be retrieved."})
  }
  
})

/**
 *   GET posts by ID
 */
postRouter.get('/:id', async (req,res) =>{
  
  try{
    const post = await postDB.get(req.params.id)
    console.log(post)
    
    // if the post exists, respond with the post, else respond with error
    post ? res.status(200).json(post) : 
      res.status(404).json({ message: "The post with the specified ID does not exist." })

  }
  catch (err){
    res.status(500).json({error: 'The user information could not be retrieved.'})
  }
})

/**
 *   POST posts by id
 */
postRouter.post('/', async (req,res) => {
  try{
    console.log(req.body.userId)
    
    //Check if request body has both the userID and the text property
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    }
    
    //Check if the userId is a number
    if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    }

    //Get the users array
    const users = await userDB.get()
    
    //Check if the userID is a valid ID
    if( !users.some( user => user.id === req.body.userId) ) {
      res.status(400).json({errorMessage: 'The id provided is not a valid id'})
    }
    
    // Good to go
    else {
      const post = await postDB.insert(req.body);
      res.status(200).json(post);
    }
  }
  catch (err){
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})



/**
 *   DELETE posts by id
 */
postRouter.delete('/:id', async (req,res) => {
  try{
    //Async call to remove the post for a certain id
    const post = await postDB.remove(req.params.id);

    //If the post = 0, send error, otherwise respond with number of posts that were deleted.
    post == 0 ? res.status(400).json({ message: "The post with the specified ID does not exist." }) :
      res.status(200).send(`${post} record(s) were deleted`);
    }
  catch (err){
    res.status(500).json({ error: "There was an error while deleting the post to the database" })
  }
})



/**
 *   PUT posts by id
 */
postRouter.put('/:id', async (req,res) => {
  try{
    //Check if the req body has a userId and text field
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    
    //Check to see that the userID is a number
    }else if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    
    //Update the resource
    }else {
      const post = await postDB.update(req.params.id, req.body)  
      
      //If the post is 0, then the id was wrong
      if (post == 0){
        res.status(400).json({ message: "The post with the specified ID does not exist." })
      } else {
        const updatedPost = await postDB.get(req.params.id)
        res.status(200).json(updatedPost);
      } 
    }
  }
  
  catch (err){
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})

module.exports = postRouter;