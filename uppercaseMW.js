module.exports = {

  uppercase: (req, res, next) =>{
  req.body.username = req.body.username.toUpperCase();

  next();
}
}