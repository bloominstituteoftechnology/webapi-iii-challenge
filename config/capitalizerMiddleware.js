

function capitalizer(req, res, next) {
    let name = req.body.name;
    req.body.name = name.toUpperCase();
    next();
  }

  module.exports = capitalizer