module.exports = (req, res, next) => {
  // next points to the next middleware/route handler in the queue

  console.log('req.body', req.body);
  newUpperCaseName = req.body.name.toUpperCase();
  req.body.name = newUpperCaseName;

  next(); // continue to the next middleware
};
