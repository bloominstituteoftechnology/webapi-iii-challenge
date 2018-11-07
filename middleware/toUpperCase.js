module.exports = (req, res, next) => {
    // next points to the next middleware/route handler in the queue
    if (req.query.pass === 'mellon') {
      console.log('welcome travelers');
  
      req.welcomeMessage = 'welcome to the mines of Moria';
  
      next(); // continue to the next middleware
    } else {
      res.send('you shall not pass!');
    }
  };