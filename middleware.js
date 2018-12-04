// Custom middleware to turn username into uppercase

const fixCase = (req, res, next) => {
  const name = req.body.name;

  if( name ){
    req.body.name = name.charAt(0).toUpperCase() + name.slice(1);
    // console.log( "name", req.body.name );
    next();
  } else {
    next();
  }
};

module.exports.fixCase = fixCase;