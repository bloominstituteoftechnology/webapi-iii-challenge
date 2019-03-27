const nameChecker = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(500).json({message: 'no access'});
      next();
    } else {
      next();
    }
  };
  
  
  module.exports = {
    nameChecker
}