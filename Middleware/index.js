// inside the middleware folder

module.exports = {
    greeter,
    logger,
    errorHandler,
  };
  
  function greeter(name) {
    return function(req, res, next) {
      console.log(`hello ${name}`);
      console.log(req.query);
      // http://localhost:8000/?pass=mellon
      if (req.query.pass === 'mellon') {
        next();
      } else {
        res.send('YOU SHALL NOT PASS!!!!');
      }
    };
  }
  
  function logger(msg) {
    return function(req, res, next) {
      console.log(`\n= ${msg || 'requesting'}: ${req.url}`);
  
      next();
    };
  }
  
  function errorHandler(err, req, res, next) {
    if (err) {
      // check the type of error and react to it
      if (err.errno === 19) {
        res.status(400).json({ msg: 'Please provide all required fields' });
      } else {
        res.status(500).json({ error: 'something bad happened' });
      }
    }
  }