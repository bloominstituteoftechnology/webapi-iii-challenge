const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');


router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "The tags data could not be retrieved." })
  });
});

router.get('/:tagId', (req, res) => {
  const { tagId } = req.params;
  
  db.get(tagId)
  .then(response => {
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Tag with specified ID does not exist"})
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The tag information could not be retrieved, or doesn't exist" })
  });
});

router.post('/', (req, res) => {
  const newTag = req.body;
  
  if (!newTag) {
    res.status(400).json({ errorMessage: "Please provide a tag." })
  }
  
  db.insert(newTag)
  .then(response => {
    
    db.get(response.id)
    .then(tag => res.status(200).json(tag))
    .catch(error => {
      res.status(500).json({ error: "There was an inner error while saving tag to the database." })
    });
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving tag to the database." })
  });
});

router.put('/:tagId', (req, res) => {
  const { tagId } = req.params;
  const tag = req.body.tag;
  
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide tag to update." })
    return;
  }
  
  db.update(tagId, req.body)
  .then(response => {
    if(response) {
      db.get(tagId)
      .then(result => res.status(200).json(result));
    } else {
      res.status(404).json({ message: "The tag with the specified ID does not exist." });
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The tag information cannot be modified." });
  });
});

router.delete('/:tagId', (req, res) => {
  const { tagId } = req.params;
  let tag;
  
  db.get(tagId)
  .then(response => {
    tag = { ...response }
    
    db.remove(tagId)
    .then(response => {
      if (response) {
        res.status(200).json({ deleted: tag });
      } else {
        res.status(404).json({ message: "The tag with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ innerError: "The tag could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "The tag with the specified ID does not exist." });
  });
  
});


module.exports = router;