const users = require('../../data/helpers/userDb');

module.exports = (req, res) => {
  const { id } = req.params;
  users.get(id)
    .then(user => {
      if(user){
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user could not be retrieved.' });
    });
};