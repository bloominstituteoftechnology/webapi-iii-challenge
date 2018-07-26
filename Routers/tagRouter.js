const express = require('express')
const tagDB = require('../data/helpers/tagDb')

const tagRouter = express.Router();

/**
 *   GET tags
 */
tagRouter.get('/', async (req,res) =>{
  try{
    //Async call to tagDB
    const tags = await tagDB.get()
    
    tags.length > 0 ? res.status(200).send(tags) : 
     res.status(404).json({ message: "The users information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The users information could not be retrieved."})
  }
  
})

/**
 *   GET tags by ID
 */
tagRouter.get('/:id', async (req,res) =>{
  
  // Using Async/Await
  try{
    const post = await tagDB.get(req.params.id)
    console.log(post)
    post ? res.status(200).json(post) : 
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    // res.status(200).json(post)
  }
  catch (err){
    res.status(500).json({error: 'The user information could not be retrieved.'})
  }
})

/**
 *   POST tags by id
 */
tagRouter.post('/', async (req,res) => {
  try{
    if (!req.body.tag){
      res.status(400).json({errorMessage: 'A unique tag is required in the request body.'})
    }

    //Check Uniqueness
    const tags = await tagDB.get()
    if (tags.some( tag => tag.tag === req.body.tag)){
      res.status(400).json({errorMessage: 'Please specify a unique tag. This tag already exists.'})
    
    //Check if string length is < 80 characters long
    }else if (req.body.tag.length > 80){
      res.status(400).json({errorMessage: 'The tag must be less than 80 characters'})
    
    //Good to go!
    }else {
      const post = await tagDB.insert(req.body);
      res.status(200).json(post);
    }
  }
  catch (err){
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})

/**
 *   DELETE tags by id
 */
tagRouter.delete('/:id', async (req,res) => {
  try{
    const tag = await tagDB.remove(req.params.id);
    console.log(tag)
    tag == 0 ? res.status(400).json({ message: "The tag with the specified ID does not exist." }) :
      res.status(200).send(`${tag} record(s) were deleted`);
    }
  catch (err){
    res.status(500).json({ error: "There was an error while deleting the tag to the database" })
  }
})

/**
 *   PUT tags by id
 */
tagRouter.put('/:id', async (req,res) => {
  try{
    //Check if tag exists:
    if (!req.body.tag){
      res.status(400).json({errorMessage: 'A unique tag (body) is required in the request body.'})
    }

    const tags = await tagDB.get()
    
    //Check Uniqueness
    if (tags.some( tag => tag.tag === req.body.tag)){
      res.status(400).json({errorMessage: 'Please specify a unique tag. This tag already exists.'})
    
    //Check if string length is < 80 characters long
    }else if (req.body.tag.length > 80){
      res.status(400).json({errorMessage: 'The tag must be less than 80 characters'})
    
    //Good to go!
    }else {
      const tag = await tagDB.update(req.params.id, req.body)  
      if (tag == 0){
        res.status(400).json({ message: "The tag with the specified ID does not exist." })
      } else {
        const updatedTag = await tagDB.get(req.params.id)
        res.status(200).json(updatedTag);
      } 
    }
  }
  
  catch (err){
    res.status(500).json({ error: "There was an error while saving the tag to the database" })
  }
})

module.exports = tagRouter;