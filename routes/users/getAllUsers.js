const users = require('../../data/helpers/userDb');

module.exports = (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'The list of users could not be retrieved.' });
    });
};