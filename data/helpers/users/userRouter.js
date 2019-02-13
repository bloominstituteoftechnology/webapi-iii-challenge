const express = require('express');

const Users = require('./userDb');
const cors = require('cors');

const router = express.Router();
router.use(cors());


// GET 
router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

// POST

// PUT

// DELETE





module.exports = router;