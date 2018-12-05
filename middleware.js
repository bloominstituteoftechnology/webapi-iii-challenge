const capitalize = (req, res, next) => {
  const user = req.body.name;
  if (user = req.body.name.toUpperCase()) {
    next()
  } else {
    res.status(400).json({ message: "name needs to be uppercased" })
  };
};

module.exports = capitalize;