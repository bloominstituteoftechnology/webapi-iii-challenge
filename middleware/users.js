const uppercaseName = (req, res, next) => {
  let { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "No name, please supply a name" });
  }
  let uppercaseName = name.toUpperCase();

  console.log(uppercaseName);

  req.body.name = uppercaseName;
  next();
};

module.exports = {
  uppercaseName
};
