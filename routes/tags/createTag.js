const tags = require('../../data/helpers/tagDb');
const getUpdatedTags = require('./getAllTags');

module.exports = (req, res) => {
  const { tag } = req.body;

  tags.insert({ tag })
    .then(response => {
      getUpdatedTags(req, res);
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error while saving the tag.' });
    });
};