const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({"errorMessage":message});
}

const conErr = (err) => { //Logs the compiler error to the console
  console.log("Console Error:", err);
}


router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch {
    sendUserError(500, "Cannot retrieve users", res);
  }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (name.length > 128) return sendUserError(400, `Bad Request: Your string is ${name.length} characters, it should be less than 128`, res);
  try {
    const userId = await userDb.insert({name}); //This really creates the user but since it returns an ID I label it as such and pass it into a getByID function
    try {
      const user = await userDb.get(userId.id);
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  const { name } = req.body;
  if (!name) return sendUserError(400, "Bad Request: Please provide a valid name");
  else if (name.length > 128) return sendUserError(400, `Bad Request: Your string is ${name.length} characters, it should be less than 128`, res);
  try {
    const userID = await userDb.update(req.params.id, {name});
    if (userID === 0) return sendUserError(404, `Not Found: Could not find post with ID ${req.params.id}`, res);
    try {
      const user = await userDb.get(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      console.log("Console Error:", err);
      return sendUserError(500, "Server Error: Created user could not be retrieved", res);
    }
  } catch(err) {
    console.log("Console Error:", err);
    return sendUserError(500, "Server Error: User could not be updated", res);
  }
})

router.get('/:id/posts', async (req, res) => {
  try {
    const userPosts = await userDb.getUserPosts(req.params.id);
    if (userPosts.length === 0) return sendUserError(404, `Not Found: No user with ID ${req.params.id} or no posts for that user`, res);
    res.status(200).json(userPosts);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Could not retreive user posts`, res);
  }
})

module.exports = router;
