const express = require('express');
const posts = require('../../data/helpers/postDb');

const router = express.Router();

//posts endpoints

//get all posts
router.get('/', (req, res) => {
  posts.get()
        .then(psts => res.status(201).json(psts))
        .catch(err => res.status(500).json({ error: "Failed to retrieve Posts" }));
});

//get a post by id
router.get('/:id', (req, res) => {
  posts.get(req.params.id)
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json({ error: `Failed to Retrieve Post with id ${id}.` }));
});

//get all tags of post with id
router.get('/:id/tags', (req,res)=>{
  const { id } = req.params;

  posts.getPostTags(id)
        .then(tags => res.status(201).json(tags))
        .catch(err => res.status(500).json({ error: `Failed to Retrieve Tags for Post with id ${id}.` }));
});

//create a new post using text and associated user id
router.post('/', (req, res) => {
  const { text, userId } = req.body;
  if(!text || !userId) res.status(422).json({ message: 'ID of poster and post text is required!'});

  posts.insert({ text, userId })
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ error: "Database Failure on Inserting New Post" }));
});

//remove a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  posts.remove(id)
        .then(deleted => deleted === 1 ?
                          res.status(201).json({ message: `Post with id ${id} deleted.`}) :
                          res.status(500).json({ error: "Invalid Post ID" })
                        )
        .catch(err => res.status(500).json({ error: `Database Failure on Deleting Post with id ${id}` }));
});

//change the text of a post
router.put('/:id', (req, res) => {
  const { id } =  req.params;
  const { text } = req.body;
  posts.update(id, { text })
        .then(updated => updated === 1 ?
                          res.status(201).json({ message: `Post with id ${id} updated.`}) :
                          res.status(500).json({ error: "Invalid Post ID" }))
        .catch(err => res.status(500).json({ error: `Database Failure on Updating Post with id ${id}` }));
});

module.exports = router;
