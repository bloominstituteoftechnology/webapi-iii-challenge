const express = require('express');
const postDB = require('./data/helpers/postDb')
const tagDB = require('./data/helpers/tagDb')
const userDB = require('./data/helpers/userDb')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
  res.send('Welcome Node-Blog');
});


// ===============    CRUD FOR postDB ===========================================
/**
 *   GET posts
 */
server.get('/api/posts', async (req,res) =>{
  try{
    const posts = await postDB.get()
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
server.get('/api/posts/:id', async (req,res) =>{
  
  // Using Async/Await
  try{
    const post = await postDB.get(req.params.id)
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
 *   POST posts by id
 */
server.post('/api/posts', async (req,res) => {
  try{
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    }else if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    }else {
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
server.delete('/api/posts/:id', async (req,res) => {
  try{
    const post = await postDB.remove(req.params.id);
    console.log(post)
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
server.put('/api/posts/:id', async (req,res) => {
  try{
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    }else if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    }else {
      const post = await postDB.update(req.params.id, req.body)  
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







// ===============    CRUD FOR tagDB ===========================================
/**
 *   GET tags
 */
server.get('/api/tags', async (req,res) =>{
  try{
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
server.get('/api/tags/:id', async (req,res) =>{
  
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
server.post('/api/tags', async (req,res) => {
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
server.delete('/api/tags/:id', async (req,res) => {
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
server.put('/api/tags/:id', async (req,res) => {
  try{
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    }else if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
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









server.listen(8000, () => console.log('\n ====== API running on port this 8000 ======= \n'));