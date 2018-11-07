// custom middle to convert first letter of the user's name to uppercase
module.exports = (req, res, next) => {
  req.body.name =
    req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  next();
};
