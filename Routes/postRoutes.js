const express = require('express')
const db = require('../data/helpers/postDb')
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
      }})
      .catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
});
router.get('/:id', (req, res) => {
    const {id} = req.params;
    db
    .getById(id)
    .then(posts => { 
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
    })
});
// Add Posts
router.post('/', (req, res) => {
    const { text, user_id } = req.body;
    const newPost= { text, user_id};
    if (!text) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a text for the post." });
    }
    db.insert(newPost)
      .then(postId => {
        console.log(postId)
        const { id } = postId;
        db.getById(id).then(user => {
          console.log(user);
          if (!user) {
            return res
              .status(404)
              .send({ Error: `A post does not exist by that id ${id}` });
          }
          else{
          res.status(201).json(user);
          }
        });
      })
      .catch(() => res.status(500).json({success: false, message: "There was an error while saving the user to the database."})
  )});

// router.post('/', (req, res) => {
//     const { text, user_id } = req.body;
//     const newPost= { text, user_id };
//     if (!text) {
//       return res
//         .status(400)
//         .json({ errorMessage: "Please provide text for the post." });
//     }
//     db.insert(newPost)
//       .then(post => console.log(post))
//       .catch(err => console.log(err))
// });

// Delete Single Post
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(posts => { 
        if(posts){
        res.status(204).end();
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
    })
});
// Edit a Post
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






module.exports = router