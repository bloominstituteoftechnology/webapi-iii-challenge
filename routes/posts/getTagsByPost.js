const posts = require('../../data/helpers/postDb');

module.exports = (req, res) => {
  const { id } = req.params;

  posts.getPostTags(id)
    .then(tags => {
      if (tags.length > 0) {
        res.status(200).json(tags);
      } else {
        res.status(404).json({ error: 'The post with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The list of tags by this post could not be retrieved.' });
    });
};