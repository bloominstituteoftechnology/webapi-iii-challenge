import TagHelpers from '../data/helpers/tagDb';
import db from '../data/seeds/01-tags';

// GET USER
const TagController = {
  getTags: (req, res) => {
    db
      TagHelpers.get(req.params.id)
      .then(tag => {
        res.json(tag);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  getTag: (req, res) => {
    db
      TagHelpers.get(req.params.id)
      .then(tag => {
        res.json(tag);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  createTag: (req, res) => {
    db
      TagHelpers.insert(req.body)
      .then(newTag => {
        res.json(newTag);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }, 

  updateTag: (req, res) => {
    db
      TagHelpers.update(req.params.id, req.body)
      .then(tag => {
        res.json(tag);
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
  },

  deleteTag: (req, res) => {
    db
      TagHelpers.remove(req.params.id)
      .then(tag => {
        res.json({ msg: 'Tag deleted.' });
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
  }
} 

export default TagController;