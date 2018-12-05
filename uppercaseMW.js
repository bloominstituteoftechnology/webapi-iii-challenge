
const uppercased = (req, res, next) => {
  const user = req.body;
  user.body.name.toUppercase();
      next();
  } 

module.exports = {
  uppercased: uppercased,

}