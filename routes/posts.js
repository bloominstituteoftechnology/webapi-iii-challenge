const express = require("express");
const postDb = require("../data/helpers/postDb");


const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const results = await postDb.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:postID", async (req, res) => {
  if (!Number(req.params.postID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await postDb.get(Number(req.params.postID));
    if (results) {
      res.status(200).json(results);
    }
    res.status(500).json({ errorMessage: "Invalid post for lookup" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  if (!req.body.userId || !req.body.text) {
    res.status(400).json({ errorMessage: "Content missing" });
  }
  try {
    const results = await postDb.insert(req.body);
    console.log(results);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/user/:userid", async (req, res) => {
  try {
    const results = await postDb.getPostsForUser(req.params.userid);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:postID", async (req, res) => {
  if (!req.body.userId || !req.body.text) {
    res.status(400).json({ errorMessage: "Content missing" });
  }
  if (!Number(req.params.postID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await postDb.update(req.params.postID, req.body);
    console.log(results);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
