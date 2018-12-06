const capitalizeFirstLetter = (req, res, next) => {
  const { name } = req.body;
  if (name) {
    // uppercase all
    // req.body.name = name.toUpperCase();
    // uppercase only first letter of each name
    req.body.name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  next();
}

module.exports = {
  capitalizeFirstLetter: capitalizeFirstLetter
}