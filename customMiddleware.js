const db = require("./data/helpers/userDb.js");
const makeUppercase = async (req, res, next) => {
  if (req.body.name) {
    //   res.status(400).json({ error: "name is required" });
    // } else {

    const firstLast = req.body.name.split(" ");
    const capitalizedArr = firstLast.map(
      string => string.charAt(0).toUpperCase() + string.slice(1)
    );
    const capitalizedString = capitalizedArr.join(" ");
    req.body.name = capitalizedString;
    res.status(201);

    // } catch (err) {
    //   res.status(500).json({ error: "Trouble applying uppercase" });
    // }
  }
  next();
};

module.exports = {
  makeUppercase: makeUppercase
};
