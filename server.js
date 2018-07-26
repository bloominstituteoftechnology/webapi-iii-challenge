const express = require('express');
const postDB = require('./data/helpers/postDb')
const tagDB = require('./data/helpers/tagDb')
const userDB = require('./data/helpers/userDb')
var cors = require('cors')

const server = express();

server.use(express.json())
server.use(cors())

// Basic req/res test
server.get('/', (req, res) => {
  res.send('Welcome Node-Blog API');
});


// ===============    CRUD FOR postDB ===========================================
/**
 *   GET posts
 */
server.get('/api/posts', async (req,res) =>{
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
server.get('/api/posts/:id', async (req,res) =>{
  
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
server.post('/api/posts', async (req,res) => {
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
server.delete('/api/posts/:id', async (req,res) => {
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
server.put('/api/posts/:id', async (req,res) => {
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







// ===============    CRUD FOR tagDB ===========================================
/**
 *   GET tags
 */
server.get('/api/tags', async (req,res) =>{
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




// ===============    CRUD FOR userDB ===========================================
/**
 *   GET users
 */
server.get('/api/users', async (req,res) =>{
  try{
    const users = await userDB.get()
    users.length > 0 ? res.status(200).send(users) : 
     res.status(404).json({ message: "The users information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The users information could not be retrieved."})
  }
  
})

/**
 *   GET users by ID
 */
server.get('/api/users/:id', async (req,res) =>{
  
  // Using Async/Await
  try{
    const post = await userDB.get(req.params.id)
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
 *   POST users by id
 */
server.post('/api/users', async (req,res) => {
  try{
    if (!req.body.name){
      res.status(400).json({errorMessage: 'A unique name is required in the request body.'})
    }

    //Check Uniqueness
    const users = await userDB.get()
    if (users.some( name => name.name === req.body.name)){
      res.status(400).json({errorMessage: 'Please specify a unique name. This name already exists.'})
    
    //Check if string length is < 128 characters long
    }else if (req.body.name.length > 128){
      res.status(400).json({errorMessage: 'The name must be less than 128 characters'})
    
    //Good to go!
    }else {
      const post = await userDB.insert(req.body);
      res.status(200).json(post);
    }
  }
  catch (err){
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  }
})

/**
 *   DELETE users by id
 */
server.delete('/api/users/:id', async (req,res) => {
  try{
    const name = await userDB.remove(req.params.id);
    console.log(name)
    name == 0 ? res.status(400).json({ message: "The name with the specified ID does not exist." }) :
      res.status(200).send(`${name} record(s) were deleted`);
    }
  catch (err){
    res.status(500).json({ error: "There was an error while deleting the name to the database" })
  }
})

/**
 *   PUT users by id
 */
server.put('/api/users/:id', async (req,res) => {
  try{
    //Check if name exists:
    if (!req.body.name){
      res.status(400).json({errorMessage: 'A unique name (body) is required in the request body.'})
    }

    const users = await userDB.get()
    
    //Check Uniqueness
    if (users.some( name => name.name === req.body.name)){
      res.status(400).json({errorMessage: 'Please specify a unique name. This name already exists.'})
    
    //Check if string length is < 128 characters long
    }else if (req.body.name.length > 128){
      res.status(400).json({errorMessage: 'The name must be less than 128 characters'})
    
    //Good to go!
    }else {
      const name = await userDB.update(req.params.id, req.body)  
      if (name == 0){
        res.status(400).json({ message: "The name with the specified ID does not exist." })
      } else {
        const updatedName = await userDB.get(req.params.id)
        res.status(200).json(updatedName);
      } 
    }
  }
  
  catch (err){
    res.status(500).json({ error: "There was an error while saving the name to the database" })
  }
})

/**
 *   GET USER POSTS - helper
 */
server.get('/api/user/:id/posts', async (req,res) =>{
  
  // Using Async/Await
  try{
    const post = await userDB.getUserPosts(req.params.id)
    console.log(post)
    post ? res.status(200).json(post) : 
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    // res.status(200).json(post)
  }
  catch (err){
    res.status(500).json({error: 'The user information could not be retrieved.'})
  }
})


server.listen(8000, () => console.log('\n ====== API running on port this 8000 ======= \n'));