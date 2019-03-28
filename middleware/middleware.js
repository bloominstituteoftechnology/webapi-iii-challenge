const nameChecker = (req, res, next) => {
    if (!req.body.name) {
        res.status(500).json({message: 'need a name'});
      next();
    } else {
      next();
    }
  };

  const toCap = () => {
      const name = req.body.name.toUpperCase();
      req.body.name = name;
      next()
  }
  
  
  module.exports = {
    nameChecker
}