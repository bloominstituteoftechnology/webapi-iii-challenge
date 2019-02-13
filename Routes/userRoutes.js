const express = require('express')
const db = require('../data/helpers/userDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(users => {
        if(users){
        res.status(200).json({success: true, users})
      } else{
        res.status(500).json({success:false, message: 'The users information could not be retrieved.'});
      }})
      .catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
});
router.get('/:id', (req, res) => {
    const {id} = req.params;
    db
    .getById(id)
    .then(users => { 
        if(users){
        res.status(200).json({success: true, users})
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The users information could not be retrieved.'});
    })
});
// Add users
router.post('/', (req, res) => {
    const { name } = req.body;
    const newUser= { name };
    if (!name) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a name for the user." });
    }
    db.insert(newUser)
      .then(userId => {
        const { id } = userId;
        db.getById(id).then(user => {
          console.log(user);
          if (!user) {
            return res
              .status(404)
              .send({ Error: `A user does not exist by that id ${id}` });
          }
          else{
          res.status(201).json(user);
          }
        });
      })
      .catch(() => res.status(500).json({success: false, message: "There was an error while saving the user to the database."})
  )});
// Delete Single user
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(users => { 
        if(users){
        res.status(204).end();
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The users information could not be retrieved.'});
    })
});
// Edit a user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const post = { text };
    console.log(post) //{ title: 'Exzc', contents: 'ent at Lambda School' }
    if (!text) {
        return res.status(400).json({success: false, message: "Must provide content for the post"});
    }
    db.update(id, post)
      .then(response => {
        if(response == 0) {
            return res.status(404).json({success: false, message: "Post with ID does not exist"});
        }
        db.getById(id)
          .then(post=> {
              console.log(post)
              if(post.length === 0) {
                return res.status(404).json({success: false, message: "Post with ID does not exist"});
              }
              res.json({post});
          })
  
      })
      .catch(message => {
        return res.status(400).json({success: false, message: message});
      });
  });

//Get a Users Posts
router.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    db
    .getUserPosts(id)
    .then(users => { 
        if(users){
        res.status(200).json({success: true, users})
      } else{
        res.status(404).json({success:false, message: 'The user with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The users information could not be retrieved.'});
    })
});
module.exports = router