const express = require ('express');
const router = express.Router();

const postDb = require('../data/helpers/postDb');

router.get("/", async (req, res) => {
    try {
      const posts = await postDb.get();
      res.json(posts);
    } catch (err) {
      res
        .status(500)
        .json({ message: "The posts cannot be retrieved from the database." });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postDb.get(id);
      res.json(post);
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an unexpected error happened." });
    }
});

router.post('post/:id', async (req,res) =>{
    const {id} = req.params;
    const post = req.body;

    try{
        const user = await postDb.get(id);
        if(!user){
            res.status(404).json({message :' User doesnt exist'});
        } else {
            const newPost = await postDb.insert(post);
            res.json(newPost);
        }
    } catch (err){
        res.status(500).json({message: 'Post rejected.'});
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postDb.get(id);
      console.log("post", post);
      if (!post) {
        res.status(404).json({ message: "The post does not exist." });
      } else {
        await postDb.remove(id);
        res.json(post);
      }
    } catch (err) {
      res.status(500).json({ message: "Could not delete the post." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    try {
      const updatedPost = await postDb.update(id, post);
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: "Cannot update the post." });
      } else {
        res.json(updatedPost);
      }
    } catch (err) {
      res.status(500).json({ message: "Could not update post." });
    }
});

module.exports = router;
  