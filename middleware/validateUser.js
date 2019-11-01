function validateUser(req, res, next) {
  req.body
    ? req.body.name
      ? next()
      : res.status(400).json({ message: "missing required name field." })
    : res.status(400).json({ message: "missing user data" });
}

module.exports = validateUser;
