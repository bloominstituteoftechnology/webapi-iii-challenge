//////////////================================= START MIDDLEWARE =================================//////////////
// converts name to all uppercase
// const nameToUpperCase = (req, res, next) => {
//   // gets rid of name if too many chars
//   if (req.body.name.length > 128) {
//     res.status(400).json({ message: "Username contains too many characters." });
//   }
//   req.body.name = req.body.name.toUpperCase();
//   next();
// };
//////////////================================= END MIDDLEWARE =================================//////////////

module.exports = nameToUpperCase = (req, res, next) => {
  // gets rid of name if too many chars
  if (req.body.name.length > 128) {
    res.status(400).json({ message: "Username contains too many characters." });
  }
  req.body.name = req.body.name.toUpperCase();
  next();
};
