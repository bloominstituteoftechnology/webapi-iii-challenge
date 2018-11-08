const express = require("express");
const router = express.Router();

// G E T  T A G S  by  P O S T  I D
router.get("/posts/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDB.getPostTags(id).then(posts => {
    res.status(200).json(posts);
  });
});

module.exports = router;
