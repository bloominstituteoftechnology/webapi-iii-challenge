const users = require('../../data/helpers/userDb');

const getUsers = (req, res, next) => {
  const { userId } = req.body;

  users.get(userId)
    .then(user => {
      if(user){
        req.user = user;
        next();
      } else {
        res.status(400).json({ error: 'Please provide a valid userId.' });
      }
    })
    .catch(error => {
      res.status(400).json({ error: 'Please provide a valid userId.' });
    });
}

const validateRequestData = (req, res, next) => {
  const { text } = req.body;
  if (postTextExists(text, res) && userIdExists(req, res)) {
    next();
  }
}

const postTextExists = (text, res) => {
  if (!text) {
    res.status(400).json({ error: 'Please provide text for the post.' });
    return false;
  }

  return true;
}

const userIdExists = (req, res) => {
  if(req.user.id) {
    return true
  }

  res.status(400).json({ error: 'Please provide a valid userId.' });
  return false;
}

module.exports = {
  getUsers,
  validateRequestData
}