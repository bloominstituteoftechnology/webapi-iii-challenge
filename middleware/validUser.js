const userDb = require('../data/helpers/userDb.js');

module.exports = (req, res, next) => {
  if (req.body.userId) {
    userDb
      .get()
      .then(users => {
        // Filters the users
        let filteredUsers = users.filter(user => {
          return req.body.userId === user.id;
        });

        if (filteredUsers[0]) {
          next();
        } else {
          res
            .status(404)
            .json({ message: 'User does not exist, please try again.' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'There was and error checking if the user is valid',
          error
        });
      });
  } else {
    res.status(400).json({ message: 'Include the users ID in the request' });
  }
};
