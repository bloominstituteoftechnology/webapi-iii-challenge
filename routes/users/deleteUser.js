const users = require('../../data/helpers/userDb');
const getUpdatedUsers = require('./getAllUsers');

module.exports = (req, res) => {
  const { id } = req.params;

  users.remove(id)
    .then(recordsDeleted => {
      if(recordsDeleted > 0){
        getUpdatedUsers(req, res);
      } else {
        res.status(500).json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user could not be removed.' });
    });
};