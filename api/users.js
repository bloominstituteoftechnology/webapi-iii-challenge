const router = require('express')();
const User = require('../data/helpers/userDb');

router.get('/', async (req, res) => {
  try {
    const users = await User.get();
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'There was an error getting users' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.get(id);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: 'There was an error finding specified user' });
  }
});

router.post('/', async (req, res) => {
  const newUser = { ...req.body };
  try {
    const id = await User.insert(newUser);
    res.status(201).json(id);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'There was an error adding user' });
  }
});

router.put('/:id', async (req, res) => {
  const updatedUser = { ...req.body };
  const { id } = req.params;

  try {
    const count = await User.update(id, updatedUser);
    if (count > 0) {
      res
        .status(201)
        .json({ success: 'You have successfully updated that user' });
    } else throw Error();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Error updating user' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await User.remove(id);
    if (count > 0) {
      res
        .status(200)
        .json({ success: 'You have successfully deleted that user' });
    } else throw Error();
  } catch (err) {
    res.status(400).json({ error: 'Error deleting user' });
  }
});

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await User.getUserPosts(id);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: 'Error getting posts from that user' });
  }
});
module.exports = router;
