const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('this goes to /examples')
});


module.exports = router;