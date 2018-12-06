const makeUppercase = (req, res, next) => {
    const name = req.body.name;

    if (!name) {
      res.status(400).json({ error: "name is required" });
    } else {
        const capitalizedString = name.toUpperCase();
        req.body.name = capitalizedString;
        next();
      } 
  };

  
  module.exports = {
    makeUppercase: makeUppercase
  };