module.exports = (req, res, next) => {
  let nameInput = req.body.name;
  const firstLastArr = nameInput.split(' ');
  const uppercaseNameArr = firstLastArr.map((name) => name.toUpperCase());

  req.body = { name: `${uppercaseNameArr.join(' ')}` };

  next();
};
