const posts = require('../../data/helpers/postDb');

module.exports = (req, res) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: 'The list of posts could not be retrieved.' });
    });
};