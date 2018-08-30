const express = require('express');
const userdb = require('.../data/helpers/userDb');
const mw = require('../middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data = await userdb.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await userdb.get(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: 'This user does not exist.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    let data = await userdb.getUserPosts(req.params.id);
    console.log(data);
    if (data.length) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: 'This user does not have any posts.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', mw.users, async (req, res) => {
  let body = req.body;
  try {
    let data = await userdb.insert(body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', mw.users, async (req, res) => {
  let body = req.body;
  try {
    let data = await userdb.update(req.params.id, body);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: 'The user with this id does not exist.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await userdb.remove(req.params.id);
    if (data) {
      return res.status(200).json({ id: req.params.id });
    } else {
      return res
        .status(404)
        .json({ error: 'The user with this id does not exist.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
