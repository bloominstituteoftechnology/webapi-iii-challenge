module.exports = (req, res, next) => {
  //   // next points to the next middleware/route handler in the queue
  if (`/api/posts.${req.body.id})` !== req.body.userId) {
    // res.json({ errorMessage: 'provide shorter name please' });
    console.log('if')
    next();
    } else {
      console.log('else')
      next()
    }
  };