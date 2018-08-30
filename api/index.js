const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/tags', require('./tags'));

module.exports = router;
