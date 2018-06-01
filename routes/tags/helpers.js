const tags = require('../../data/helpers/tagDb');

const getTags = (req, res, next) => {
  tags.get()
    .then(tags => {
      req.tags = tags;
      next();
    })
    .catch(error => {
      res.status(500).json({ error: 'Validation failed. Could not complete request.' });
    });
}

const validateRequestData = (req, res, next) => {
  const { tag } = req.body;
  if(tagExists(tag, res) && validTagLength(tag, res) && tagIsUnique(tag, req, res)){
    next();
  }
}

const tagExists = (tag, res) => {
  if (!tag) {
    res.status(400).json({ error: 'Please provide a tag.' });
    return false;
  }

  return true;
}

const validTagLength = (tag, res) => {
  if (tag.length > 80) {
    res.status(400).json({ error: 'Tag cannot exceed 80 characters.' });
    return false;
  }

  return true;
}

const tagIsUnique = (tag, req, res) => {
  if (req.tags.filter(savedTag => savedTag.tag === tag).length !== 0){
    res.status(400).json({ error: 'Tags must be unique.' });
    return false;
  }

  return true;
}

module.exports = {
  getTags,
  validateRequestData
}