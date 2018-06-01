const users = require('../../data/helpers/userDb');
const getUpdatedUsers = require('./getAllUsers');

module.exports = (req, res) => {
  const { name } = req.body;

  users.insert({ name })
    .then(response => {
      getUpdatedUsers(req, res);
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error while saving the user.' });
    });
};