module.exports = (req, res, next) => {
    const userName = req.body.name;
  
     if (!userName) {
      return res.status(400).json({
        errorMessage: 'Please provide a name for the user.'
      });
    } else if (userName.length > 128) {
      return res.status(400).json({
        errorMessage: 'Name too long. Use up to 128 characters.'
      });
    } else if (userName[0] !== userName[0].toUpperCase()) {
      return res.status(400).json({
        errorMessage: 'First letter of name must be uppercase.'
      });
    } else {
      next();
    }
  };