const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({"errorMessage":message});
}

const conErr = (err) => { //Logs the compiler error to the console
  console.log("Console Error:", err);
}

router.use(express.json());

//BEGIN POSTS CRUD
router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch(err) {
    console.log("Console Error:", err);
    sendUserError(500, "Server Error: Could not retrieve posts", res);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    if (!post) return sendUserError(404, "No post with that ID", res);
    res.status(200).json(post);
  } catch(err) {
    console.log("Console Err:", err);
    sendUserError(500, "Server Error: Could not retrive post by that ID", res);
  }
})

router.post('/', async (req, res) => {
  const { userId, text } = req.body;
  if (!(userId && text)) return sendUserError(400, "Bad Request: Please provide userId and Text", res);
  try {
    const postId = await postDb.insert({userId, text});
    try {
      const post = await postDb.get(postId.id);
      res.status(201).json(post);
    } catch(err) {
      conErr(err);
      sendUserError(404, `Could not retrieve post with ID ${postId.id}`, res);
    }
  } catch(err) {
    conErr(err);
    sendUserError(500, "Server Error: Could not create post", res);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await postDb.remove(req.params.id);
    if (result === 0) return sendUserError(404, `Not Found: No post found by ID ${req.params.id}`, res);
    res.status(200).json({"Message":`Success! Post ${req.params.id} succesfully deleted`});
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Post ${req.params.id} could not be deleted`);
  }
});

router.put('/:id', async (req, res) => {
  const { userId, text } = req.body;
  // if (!(userId && text)) return sendUserError(400, `Bad Request: Please provide userId and text`, res);
  try {
    const postId = await postDb.update(req.params.id, {userId, text});
    if (postId === 0) return sendUserError(404, `Not Found: Could not find post with ID ${req.params.id}`, res);
    try {
      const post = await postDb.get(req.params.id);
      res.status(200).json(post);
    } catch(err) {
      conErr(err);
      return sendUserError(404, `Could not retrive post ${postId.id}`, res);
    }
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Post ${postId.id} could not be updated`, res);
  }
})

router.get('/:id/tags', async (req, res) => {
  try {
    const postTags = await postDb.getPostTags(req.params.id);
    if (postTags.length === 0) return sendUserError(404, `Not Found: No post with ID ${req.params.id} found or no Tags exist`, res);
    res.status(200).json(postTags);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Could not retrieve post tags`, res);
  }
})
//END POSTS CRUD

module.exports = router;
