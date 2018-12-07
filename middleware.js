const nameUppercase = (req, res, next) => {
    // Implement the middleware function based on the options object
    const name = req.body.name.toUpperCase();
    if(name){
      req.body.name  = name 
    }
    next()
  }
module.exports.nameUppercase = nameUppercase;