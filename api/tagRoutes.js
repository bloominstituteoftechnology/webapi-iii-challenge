const express = require('express');
const router = express.Router();
const tags = require('../data/helpers/tagDb');

const toUpperCase = (req, res, next) => {
  if (req.body.tag) {
    req.body.tag = req.body.tag.toUpperCase();
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const allTags = await tags.get();
    res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json({ message: "Tags could not be retrieved.", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await tags.get(req.params.id);
    if (tag === undefined) {
      res.status(404).json({ message: "Tag does not exist." });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Tag could not be retrieved.", error: error.message });
  }
});

router.post('/', toUpperCase, async (req, res) => {
  if (!req.body.tag) {
    res.status(400).json({ message: "Please enter a tag." });
  }
  if (req.body.tag.length > 80) {
    res.status(400).json({ message: "Tag must be less than 80 characters." });
  }
  try {
    const { id } = await tags.insert(req.body);
    try {
      const newTag = await tags.get(id);
      res.status(201).json(newTag);
    } catch (error) {
      res.status(404).json({ message: "Tag does not exist." });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the tag to the database.", error: error.message });
  }
});

router.put('/:id', toUpperCase, async (req, res) => {
  if (!req.body.tag) {
    res.status(400).json({ message: "Please enter a tag." });
  }
  if (req.body.tag.length > 80) {
    res.status(400).json({ message: "Tag must be less than 80 characters." });
  }
  try {
    await tags.update(req.params.id, req.body);
    try {
      const tag = await tags.get(req.params.id);
      if (tag === undefined) {
        res.status(404).json({ message: "Tag does not exist." });
        return;
      }
      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json({ message: "Tag could not be retrieved.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the edited tag to the database.", error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await tags.remove(req.params.id);
    if (tag === 0) {
      res.status(404).json({ message: "Tag does not exist." });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the tag from the database.", error: error.message });
  }
});

module.exports = router;
