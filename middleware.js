const capitalize = (req, res, next) => {
  const user = req.body.name;
  if (user) {
    req.body.name = user.toUpperCase();
    next();
  }
};

module.exports = capitalize;