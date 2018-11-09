module.exports = (req, res, next) => {
  if (!req.body.name.length) {
    res.status(400).json({ message: 'Name is missing, please add one.' });
  }

  req.body.name = req.body.name.toUpperCase();
  next();
};
