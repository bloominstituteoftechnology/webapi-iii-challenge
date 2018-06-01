const posts = require('../../data/helpers/postDb');
const getUpdatedPosts = require('./getAllPosts');

module.exports = (req, res) => {
  const { id } = req.params;

  posts.remove(id)
    .then(recordsDeleted => {
      if (recordsDeleted > 0) {
        getUpdatedPosts(req, res);
      } else {
        res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The post could not be removed.' });
    });
};