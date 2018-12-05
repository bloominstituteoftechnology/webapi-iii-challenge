const capUser = {};

const capitalize = (req, res, next) => {
  if (req.body) {
    capUser.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(word => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
      next();
  } else next();
};


module.exports.capitalize = capitalize;
module.exports.capUser = capUser;
