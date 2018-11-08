module.exports = { 
    upperCase: (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
  }
}