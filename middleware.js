const uppercase = (req, res, next) => {
  const name = req.body.name;
  console.log(name);
  if (name) {
    req.body.name = name.toUpperCase();
  }
  next();
};

module.exports = {
  uppercase: uppercase
};
