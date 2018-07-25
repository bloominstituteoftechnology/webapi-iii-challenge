const router = require('express')();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'tags Route' });
});

module.exports = router;
