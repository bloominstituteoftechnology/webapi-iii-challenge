const users = require('../../data/helpers/userDb');

module.exports = (req, res) => {
  const { id } = req.params;

  users.getUserPosts(id)
    .then(posts => {
      if(posts.length > 0){
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: 'The user with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The list of posts by this user could not be retrieved.' });
    });
};