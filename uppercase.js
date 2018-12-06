const uppercase = (req, res, next) => {
   if(req.body.name) {
      if (req.body.name != req.body.name.toUpperCase()){
         req.body.name = req.body.name.toUpperCase();
         next();
      } else {
         res.status(400).json({message: "error modifying name"})
      }
   } else {
      next();
   }
}

module.exports = {
   uppercase: uppercase
};