// Custom middleware to turn username into uppercase

const fixCase = (req, res, next) => {
  const name = req.body.name;

  if( name ){
    req.body.name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  next();
};

const checkValidUser = (req, res, next) => {
  const user = require('./data/helpers/userDb');
  const id = req.body.userId ? req.body.userId : req.params;

  user.get(id)
    .then( users => {
      if( users ){
        next();
      } else {
        res.status(404).json({ error: "Invalid user."});
      }
    })
    .catch( err => {
      res.status(500).json({ error: "Could not retrieve user."});
    });
};

module.exports = {
  fixCase: fixCase,
  checkValidUser: checkValidUser
}