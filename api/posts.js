const router = require('express')();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'posts Route' });
});

module.exports = router;
