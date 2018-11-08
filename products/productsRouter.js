const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET REQUEST TO PRODUCTS ");
});

router.get("/:id", (req, res) => {
  res.send(` GET REQUEST TO /api/products/${req.params.id}`);
});

module.exports = router;
