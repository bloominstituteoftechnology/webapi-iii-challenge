const posts = require('../../data/helpers/postDb');
const getUpdatedPosts = require('./getAllPosts');

module.exports = (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;

  posts.update(id, { text, userId })
    .then(recordsUpdated => {
      if (recordsUpdated > 0) {
        getUpdatedPosts(req, res);
      } else {
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The post could not be modified.' });
    });
};