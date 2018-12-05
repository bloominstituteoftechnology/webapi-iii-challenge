
module.exports.uppercase = (req, res, next) => {
  const password = req.query.password;
  if (password === 'ferret') {
      next();
  } else {
      res.status(400).json({
          message: "Your password is incorrect"
      })
  }
}
