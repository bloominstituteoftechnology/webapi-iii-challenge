module.exports = (req, res, next) => {
  // next points to the next middleware/route handler in the queue

  newUpperCaseName = req.body.name
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  req.body.name = newUpperCaseName;

  next(); // continue to the next middleware
};
