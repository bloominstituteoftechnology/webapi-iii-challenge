const codes = require("./../status-codes/statusCodes");

const express = require("express");
const userDb = require("./../data/helpers/userDb");

const router = express.Router();

//middleware

router.get("/", async (req, res, next) => {
  try {
    const users = await userDb.get();
    res.status(codes.OK).json(users);
  } catch (err) {
    next({
      code: codes.INTERNAL_SERVER_ERROR,
      message: "Was not able to get users at this time"
    });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userDb.get(id);
    if (user === undefined) {
      next({
        code: codes.BAD_REQUEST,
        message: "The user with that id does not exist."
      });
      return;
    }
    res.status(codes.OK).json(user);
  } catch (err) {
    next({
      code: codes.INTERNAL_SERVER_ERROR,
      message: "Could not get user at this time"
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name.length > 128) {
      next({
        code: codes.BAD_REQUEST,
        message: "The username cannot be longer than 128 characters."
      });
      return;
    }
    if (name === undefined) {
      next({
        code: codes.BAD_REQUEST,
        message: "Please fill out the name of the user"
      });
      return;
    }
    const postResponse = await userDb.insert(req.body);
    res.status(codes.CREATED).json(postResponse);
  } catch (err) {
      next({
          code: codes.INTERNAL_SERVER_ERROR,
          message: "Was not able to post user at this time"
      })
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (name === undefined) {
      next({
          code: codes.BAD_REQUEST,
          message: "Please enter a username to update the old one"
      })
      return;
    }
    const updateResponse = await userDb.update(id, req.body);
    if (updateResponse === 0) {
        
      next({
          code: codes.NOT_FOUND,
          message: "User with that id was not found and could not be updated"
      })
      return;
    }
    res.status(codes.OK).json(updateResponse);
  } catch (err) {
      next({
          code: codes.INTERNAL_SERVER_ERROR,
          message: "Was not able to update user at this time"
      })
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await userDb.remove(id);
    if (deleteResponse === 0) {
        next({
            code: codes.NOT_FOUND,
            messsage: "The user with that id does not exist to be deleted"
        }) 
        return;
    }
    res.status(200).json(deleteResponse);
  } catch (err) {
      next({
          code: codes.INTERNAL_SERVER_ERROR,
          message: "Having problems deleting user, try again later"
      })
  }
});

module.exports = router;
