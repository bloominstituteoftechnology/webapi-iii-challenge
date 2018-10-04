// MIDDLEWARES
const upperCase = (req, res, next) => {
  if (req.body.name) return (req.name = req.body.name.toUpperCase());
  next();
};

module.exports = { upperCase };
