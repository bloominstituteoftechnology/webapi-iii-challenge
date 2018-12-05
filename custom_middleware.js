const gatekeeper = (req, res, next) => {
   let username = req.body;
   if(username.name) {
      username.name = JSON.stringify(username.name);
      if (username.name != username.name.toUpperCase()){
         username.name = JSON.parse(username.name.toUpperCase());
         next();
      } else {
         res.status(400).json({message: "error modifying name"})
      }
   } else {
      next();
   }
}

module.exports = {
   gatekeeper: gatekeeper
};