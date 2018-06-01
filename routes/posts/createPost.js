const posts = require('../../data/helpers/postDb');
const getUpdatedPosts = require('./getAllPosts');

module.exports = (req, res) => {
  const { text, userId } = req.body;

  posts.insert({ text, userId })
    .then(response => {
      getUpdatedPosts(req, res);
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error while saving the post.' });
    });
};