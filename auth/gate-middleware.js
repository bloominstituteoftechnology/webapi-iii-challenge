module.exports = gate;

function gate(req, res, next) {
  const password = req.headers.password;

  if (password && password === 'password') {
    next();
  } else {
    next("Hmm... That password doesn't seem to match our records."); // go to next error handling middleware
  }
}