// function(req, res, next) {
//   let name = req.body.name;
//   name = name.split(" ").map(item => {
//     return item = item.substring(0,1).toUpperCase() + item.substring(1);
//   }).join(" ");
//   req.body.name = name;
//   next();
// }

module.exports = {
  capitalize: function(req, res, next) {
    let name = req.body.name;
    name = name.split(" ").map(item => {
      return item = item.substring(0,1).toUpperCase() + item.substring(1);
    }).join(" ");
    req.body.name = name;
    next();
  }
 };
