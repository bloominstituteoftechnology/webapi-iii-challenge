
upperCaser = (req, res, next) => {
  req.body = {...req.body, name: req.body.name.toUpperCase()} 
    next()
}

module.exports = upperCaser;
