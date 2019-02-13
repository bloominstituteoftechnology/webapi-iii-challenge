const express = require("express");

const Posts = require("./postDb");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(cors());

// GET
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.getById(id);
    console.log(post)
    if (!post) {
      res.status(404).json({
        error: "The post with the specified Id does not exist"
      });
    } else {
      res.status(200).json({ post });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retrieved."
    });
  }
});

// POST

router.post('/', async (req, res) => {
  const {text} = req.body
  const newPost = req.body
  
  if (!text) {
    return res.status(400).json({
      errorMessage: "Please provide text content for the post"
    })
  }

  try {
    const post = await Posts.insert(newPost);
    res.status(201).json({success: true, post})

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "There was an error while saving the post to the database."
    })
  }
})

// PUT

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body

  if (!changes.text) {
    return res.status(400).json({
      errorMessage: "Please provide text to update the post"
    })
  }

  try {
    const post = await Posts.update(id, changes);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.status(201).json({
        success: true,
        post
      })
    }
    } catch (error) {
    res.status(500).json({
      error: "The post information could not be modified."
    })
  }

})

// DELETE

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const post = await Posts.remove(id)
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.status(204).end();
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "The user could not be removed"

    })
  }

})


module.exports = router;
