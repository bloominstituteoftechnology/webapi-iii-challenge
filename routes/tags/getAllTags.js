const tags = require('../../data/helpers/tagDb');

module.exports = (req, res) => {
  tags.get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json({ error: 'The list of tags could not be retrieved.' });
    });
};