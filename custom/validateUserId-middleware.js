module.exports = validateUserId;

function validateUserId(req, res, next) {
  if (!req.body.id) {
    res.status(404).json({ message: "invalid user id" });
  } else {
    next();
  }
}
