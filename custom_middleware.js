const uppercaseMiddleware = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    next();
  } else {
    next();
  }
}

module.exports = {
  uppercaseMiddleware: uppercaseMiddleware
}