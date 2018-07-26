const router = require('express')();
const Tag = require('../data/helpers/tagDb');

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.get();
    res.status(200).json({ tags });
  } catch (err) {
    res.status(400).json({ error: 'Error retreiving tags' });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tags = await Tag.get(id);
    res.status(200).json({ tags });
  } catch (err) {
    res.status(400).json({ error: 'Error retreiving specified tag' });
  }
});
router.post('/', async (req, res) => {
  const { tag } = req.body;
  try {
    if (!tag) throw Error('Tags cannot be empty');
    const id = await Tag.insert(tag);
    res.status(201).json(id);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

module.exports = router;
