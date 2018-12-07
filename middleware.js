module.exports.toTitleCase = (req, res, next) => {
  req.body.name = req.body.name.toLowerCase().replace(/\b\w/g, I => I.toUpperCase());
  next();
};