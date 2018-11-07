module.exports = (req, res, next) => {

    if (req.params.name) {
      let userName = req.params.name;
      res.send(userName.toUpperCase())
      next();
    } else {
      res.send('Please add name');
    }
  };