const capitalize = (req, res, next) => {
  const user = req.body.name;
  if (user) {
    req.body.name = user.toUpperCase();
    next();
  } else {
    next();
  }
};

module.exports = capitalize;