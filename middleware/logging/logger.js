  
function logger(req, res, next) {
    console.log(`This request is going to the path: ${req.path}, with the following method: ${req.method} at this time: ${Date.now()}`)
    next();
  };

  module.exports = logger;