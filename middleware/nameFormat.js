module.exports = (req, res, next) => {
  const user = req.body;
  const { name } = user;

  if (name) {
    const arr = name.split(" ");
    const upperCased = arr.map(
      item => item[0].toUpperCase() + item.slice(1).toLowerCase()
    );
    const joined = upperCased.join(" ");
    req.body.name = joined;
    next();
  } else {
    res.status(400).json({ message: "Please include user name" });
  }
};
