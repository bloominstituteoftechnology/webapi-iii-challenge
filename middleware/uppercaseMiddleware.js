module.exports = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  // let name = req.body.name;
  // let nameArr = name.split('');
  // nameArr[0].toUpperCase();
  // name = nameArr.join('');
  next();
};
