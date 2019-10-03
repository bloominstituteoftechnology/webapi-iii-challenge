const validatePost = (req, res, next) => {
  if (!req.body) res.status(400).json({ message: "Missing post data" });
  else if (!req.body.text)
    res.status(400).json({ message: "Missing required text field" });
  else next();
};

module.exports = validatePost;
