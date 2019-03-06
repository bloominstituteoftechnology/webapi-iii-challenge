const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Hello from Users Router')
})

module.exports = router