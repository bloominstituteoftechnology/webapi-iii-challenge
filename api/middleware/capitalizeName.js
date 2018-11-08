module.exports = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase() + req.body.name.slice(1);
  }
  next();
};
