module.exports = (req, res, next) => {
//   // next points to the next middleware/route handler in the queue
if (req.body.name.length > 128) {
  res.json({ errorMessage: 'provide shorter name please' });
  next();
  } else {
    req.body.name = req.body.name.toUpperCase();
    next()
  }
};
// '/api/users'
// req.body.name.length