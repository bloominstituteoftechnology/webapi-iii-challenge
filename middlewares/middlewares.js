// MIDDLEWARES
const upperCaser = (req, res, next) => {
  req.name = req.body.name.toUpperCase();
  next();
}

module.exports = { upperCaser };