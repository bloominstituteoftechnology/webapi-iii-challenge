const express = require('express');
const cors = require('cors');
const tagDb = require('./data/helpers/tagDb.js');
const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();



const sendUserError = (status, message, res) => {
  res.status(status).json({"errorMessage":message});
}

const conErr = (err) => { //Logs the compiler error to the console
  console.log("Console Error:", err);
}

function upperCaser(req, res, next) {
  console.log("UpperCase is working"); //Verify to the console that local middleware is working
  req.body.tag = req.body.tag.toUpperCase();
  next()
}

server.use(express.json());
server.use(cors());

//BEGIN USERS CRUD
server.get('/api/users/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch {
    sendUserError(500, "Cannot retrieve users", res);
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await userDb.get(req.params.id);
    if (!user) {
      return sendUserError(404, 'No user by that Id', res);
    }
    res.status(200).json(user);
  } catch(err) {
    console.log('console err: ', err); //This is so compiler error can be seen in dev console
    sendUserError(500, "Cannot retrieve user", res);
  }
})

server.post('/api/users/', async (req, res) => {
  const { name } = req.body;
  try {
    const userId = await userDb.insert({name}); //This really creates the user but since it returns an ID I label it as such and pass it into a getByID function
    try {
      const user = await userDb.get(userId.id);
      console.log(user);
      res.status(201).json(user);
    } catch(err) {
      console.log("console err", err)
      return sendUserError(404, "Could not find created user", res);
    }
  } catch(err) {
    console.log("console err", err);
    return sendUserError(500, "Server Error: Could not create user", res);
  }
})

server.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await userDb.remove(req.params.id);
    if (result === 0) {
      sendUserError(404, "Error: No user found by that ID", res);
      return;
    }
    res.status(200).json({"Message":"User Successfully Deleted", "result":result});
  } catch(err) {
    console.log("Console Error:", err);
    sendUserError(500, "Server Error: Could not delete user", res);
  }
})

server.put('/api/users/:id', async (req, res) => {
  const { name } = req.body;
  if (!name) return sendUserError(400, "Bad Request: Please provide a valid name");

  try {
    const userID = await userDb.update(req.params.id, {name});
    try {
      const user = await userDb.get(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      console.log("Console Error:", err);
      return sendUserError(404, "Created user could not be found", res);
    }
  } catch(err) {
    console.log("Console Error:", err);
    return sendUserError(500, "Server Error: User could not be updated", res);
  }
})

server.get('/api/users/:id/posts', async (req, res) => {
  try {
    const userPosts = await userDb.getUserPosts(req.params.id);
    if (userPosts.length === 0) return sendUserError(404, `Not Found: No user with ID ${req.params.id} or no posts for that user`, res);
    res.status(200).json(userPosts);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Could not retreive user posts`, res);
  }
})
//END USERS CRUD

//BEGIN POSTS CRUD
server.get('/api/posts/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch(err) {
    console.log("Console Error:", err);
    sendUserError(500, "Server Error: Could not retrieve posts", res);
  }
})

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await postDb.get(req.params.id);
    if (!post) return sendUserError(404, "No post with that ID", res);
    res.status(200).json(post);
  } catch(err) {
    console.log("Console Err:", err);
    sendUserError(500, "Server Error: Could not retrive post by that ID", res);
  }
})

server.post('/api/posts/', async (req, res) => {
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

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const result = await postDb.remove(req.params.id);
    if (result === 0) return sendUserError(404, `Not Found: No post found by ID ${req.params.id}`, res);
    res.status(200).json({"Message":`Success! Post ${req.params.id} succesfully deleted`});
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Post ${req.params.id} could not be deleted`);
  }
});

server.put('/api/posts/:id', async (req, res) => {
  const { userId, text } = req.body;
  // if (!(userId && text)) return sendUserError(400, `Bad Request: Please provide userId and text`, res);
  try {
    const postId = await postDb.update(req.params.id, {userId, text});
    if (postId === 0) return sendUserError(404, `Not Found: Could not find post with ID ${req.params.id}`);
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

server.get('/api/posts/:id/tags', async (req, res) => {
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

//BEGIN TAGS CRUD
server.get('/api/tags/', async (req, res) => {
  try {
    const tags = await tagDb.get();
    res.status(200).json(tags);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tags could not be retrieved`, res);
  }
});

server.get('/api/tags/:id', async (req, res) => {
  try {
    const tag = await tagDb.get(req.params.id);
    res.status(200).json(tag);
  } catch(err) {
    conErr(err);
    return sendUserError(404, `Server Error: Tag ${req.params.id} could not be retrieved`, res);
  }
})

server.post('/api/tags/', upperCaser, async (req, res) => {
  const { tag } = req.body;
  if (!tag) return sendUserError(400, `Bad Request: Please provide text for your tag`);
  try {
    const tags = await tagDb.get(); //Return tags array to check for uniqueness if next steps...

    function notUnique(tagObject) {
      return tagObject.tag.toUpperCase() === tag;
    } //Helper function to check if tag value is unique

    let check = tags.find(notUnique); //Checks if tag value is unique using a helper function

    if (check) return sendUserError(400, `Bad request: "${tag}" is already in the database choose a unique value`, res);
    const tagId = await tagDb.insert({tag});
    try {
      const tag = await tagDb.get(tagId.id);
      res.status(201).json(tag);
    } catch(err) {
      conErr(err);
      return sendUserError(404, `Not Found: Could not created tag with ID ${tagId.id}`, res);
    }
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tag could not be created`);
  }
})

server.delete('/api/tags/:id', async (req, res) => {
  try {
    const result = await tagDb.remove(req.params.id);
    if (result === 0) return sendUserError(404, `Not Found: No tag found with ID ${req.params.id}`, res);
    res.status(200).json({"Message":`Success! Tag ${req.params.id} succesfully deleted`})
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server error: tag ${req.params.id} could not be deleted`);
  }
});

server.put('/api/tags/:id', upperCaser, async (req, res) => {
  const { tag } = req.body;
  try {
    const result = await tagDb.update(req.params.id, {tag});
    if (result === 0) return sendUserError(404, `Not Found: Could not find tag with ID ${req.params.id}`, res);
    const updatedTag = await tagDb.get(req.params.id);
    res.status(200).json(updatedTag);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tag ${req.params.id} could not be updated`, res);
  }
});
//END TAGS CRUD

server.listen(8000, () => console.log('App is listening...'));
