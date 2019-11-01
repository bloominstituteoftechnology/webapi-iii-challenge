const Users = require("../users/userDb.js");

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "Invalid user id" });
    }
  });
}
module.exports = validateUserId;
