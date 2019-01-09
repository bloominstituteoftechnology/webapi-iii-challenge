const express = require("express");
const router = express.Router();

const users = require("../data/helpers/userDb");

const capitalizeName = (req, res, next) => {
  const { name } = req.body;
  const isUpperCase = name[0] === name[0].toUpperCase();
  if (!isUpperCase) {
    req.body.name = name[0].toUpperCase() + name.slice(1);
  }
  next();
};

const errorMaker = (code, message, res) => {
  res.status(code).json({ error: message });
};

//
/////// ROUTES
//

router.get("/posts/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await users.get(userId);
    if (!user) {
      errorMaker(404, "A user with that ID does not exist", res);
    } else {
      const posts = await users.getUserPosts(userId);
      res.status(200).json(posts);
    }
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.get(id);
    if (!user) {
      return errorMaker(404, "A user with that ID does not exist", res);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

router.get("/", async (req, res) => {
  try {
    const userlist = await users.get();
    res.status(200).json(userlist);
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

router.post("/", capitalizeName, async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = await users.insert({ name });
    res.status(201).json(newUser);
  } catch (err) {
    if ((err.errno = 19)) {
      errorMaker(404, "A user with that name already exists", res);
    } else {
      errorMaker(500, "Unable to reach server", res);
    }
  }
});

router.put("/:id", capitalizeName, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const user = await users.get(id);
    if (!user) {
      res.status(404).json({ errorMessage: "A user with that ID does not exist" });
    } else {
      const updated = await users.update(id, changes);
      if (updated) res.json(changes);
    }
  } catch (err) {
    if ((err.errno = 19)) {
      errorMaker(400, "A user with that name already exists", res);
    } else {
      errorMaker(500, "Unable to reach server", res);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.get(id);
    if (!user) {
      errorMaker(404, "A user with that ID does not exist", res);
    } else {
      const numberDeleted = await users.remove(id);
      res.status(200).json(numberDeleted);
    }
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

module.exports = router;
