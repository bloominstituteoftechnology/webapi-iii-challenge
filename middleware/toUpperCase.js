module.exports = (req, res, next) => {

    if (req.body.name) {
      let userName = req.body.name
      req.body.name = userName.toUpperCase();
      next();
    } else {
      console.log('Please add name');
    }
  };