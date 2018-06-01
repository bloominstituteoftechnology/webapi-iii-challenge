const tags = require('../../data/helpers/tagDb');

module.exports = (req, res) => {
  const { id } = req.params;

  tags.get(id)
    .then(tag => {
      if(tag){
        res.status(200).json(tag);
      } else {
        res.status(404).json({ error: 'The tag with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The tag could not be retrieved.' });
    });
};