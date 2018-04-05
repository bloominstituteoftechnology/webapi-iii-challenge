const express = require('express');
const db = require('../data/helpers/tagDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'ther was an error getting tags from the server' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  //console.log(id);
  db
    .get(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'ther was error getting the tag from the server' });
    });
});

router.post('/', (req, res) => {
  db
    .insert(req.body)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The tag was not inserted to the database' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db
    .update(id, req.body)
    .then(count => {
      res
        .status(200)
        .json(`the tag with the id of ${id} was updated successfully`);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `the post with the id of ${id} was not updated` });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(count => {
      res.status(200).json(`${count} tags were deleted successfully`);
    })
    .catch(error => {
      res.status(500).json({ error: 'could not delete the post' });
    });
});

module.exports = router;
