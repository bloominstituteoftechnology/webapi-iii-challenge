const express = require('express');
const tagdb = require('../data/helpers/tagDb');
const mw = require('../middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data = await tagdb.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await tagdb.get(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "The tag with this id doesn't exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', mw.tags, async (req, res) => {
  let body = req.body;
  try {
    let data = await tagdb.insert(body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', mw.tags, async (req, res) => {
  try {
    let data = await tagdb.update(req.params.id, req.body);
    if (data) {
      return res.status(200).json({ id: req.params.id });
    } else {
      return res
        .status(404)
        .json({ error: "The post with this id doesn't exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await tagdb.remove(req.params.id);
    if (data) {
      return res.status(200).json({ id: req.params.id });
    } else {
      return res
        .status(404)
        .json({ error: "The post with this id doesn't exist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
