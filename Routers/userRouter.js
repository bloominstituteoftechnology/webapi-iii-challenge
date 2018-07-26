const express = require('express')
const userDB = require('../data/helpers/userDb')

const userRouter = express.Router();

//Test to make sure this route works
// userRouter.get('/', (req, res) => {
//   res.send('Welcome to the User route');
// });


/**
 *   GET users
 */
// userRouter.get('/api/users', async (req,res) =>{
userRouter.get('/', async (req,res) =>{
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
// userRouter.get('/api/users/:id', async (req,res) =>{
userRouter.get('/:id', async (req,res) =>{
  
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
// userRouter.post('/api/users', async (req,res) => {
userRouter.post('/', async (req,res) => {
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
// userRouter.delete('/api/users/:id', async (req,res) => {
userRouter.delete('/:id', async (req,res) => {
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
// userRouter.put('/api/users/:id', async (req,res) => {
userRouter.put('/:id', async (req,res) => {
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
// userRouter.get('/api/user/:id/posts', async (req,res) =>{
userRouter.get('/:id/posts', async (req,res) =>{
  
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


module.exports = userRouter;