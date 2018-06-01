const tags = require('../../data/helpers/tagDb');
const getUpdatedTags = require('./getAllTags');

module.exports = (req, res) => {
  const { id } = req.params;

  tags.remove(id)
    .then(recordsDeleted => {
      if(recordsDeleted > 0){
        getUpdatedTags(req, res);
      } else {
        res.status(404).json({ error: 'The tag with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The tag could not be removed.' });
    });
};