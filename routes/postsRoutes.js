const express = require('express');
const postdb = require('../data/helpers/postDb');
const mw = require('../middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data = await postdb.get();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await postdb.get(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: 'The post with this id does not exist.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', mw.posts, async (req, res) => {
  let body = req.body;
  try {
    let data = await postdb.insert(body);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: "The user with this id doesn't exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', mw.posts, async (req, res) => {
  let body = req.body;
  try {
    let user = await userdb.get(body.userId);
    if (!user) {
      return res
        .status(400)
        .json({ error: 'the user with this id does not exist.' });
    }
    let data = await postdb.update(req.params.id, body);
    if (data) {
      return res.status(200).json(body);
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
    let data = await postdb.remove(req.params.id);
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

// router.get('/postTags/:id', async (req, res) => {
//   try {
//     let data = await postdb.getPostTags(req.params.id);
//     if (data) {
//       return res.status(200).json(data);
//     } else {
//       return res
//         .status(404)
//         .json({ error: 'The post with thid id does not exist.' });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
