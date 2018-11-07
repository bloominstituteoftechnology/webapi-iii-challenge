module.exports = (req, res, next) => {
    req.body.name.toUpperCase();
    next();
  };