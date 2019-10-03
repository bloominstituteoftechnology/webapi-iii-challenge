const userDb = require("../userDb");

const validateUserId = async (req, res, next) => {
  const user = await userDb.getById(req.params.id);
  if (req.body.id && user) {
    next();
  } else {
    res.status(400).json({ message: "Invalid user id" });
  }
};

module.exports = validateUserId;
