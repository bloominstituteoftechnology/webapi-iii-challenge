module.exports = (req, res, next) => {
  // next points to the next middleware/route handler in the queue
  if (req.query.pass === "Lambda's-best-weapon") {  
    //http://localhost:9000/secret/?pass=Lambda's-best-weapon
    console.log('welcome travelers');

    req.welcomeMessage = 'Welcome	&#127993; &#128104 rhymes with &#9924;';

    next(); // continue to the next middleware
  } else {
    res.send('you shall not pass!');
  }
};