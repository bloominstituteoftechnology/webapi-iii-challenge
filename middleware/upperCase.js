const upperCase = (req, res, next) => {
  req.body.name =
    req.body.name[0].toUpperCase() + req.body.name.slice(1).toLowerCase();
  next();
};

module.exports = upperCase;
