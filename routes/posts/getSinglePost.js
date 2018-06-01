const posts = require('../../data/helpers/postDb');

module.exports = (req, res) => {
  const { id } = req.params;
  posts.get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The post could not be retrieved.' });
    });
};