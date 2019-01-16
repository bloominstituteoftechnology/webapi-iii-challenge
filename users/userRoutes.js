const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');

router.use(express.json());


// C - Create
// Ra - ReadAll
router.get('/', (req, res) => {
    res
        .status(200)
        .send('Welcome to Users');
});
// R1 - ReadOne
// U - Update
// D - Destroy

module.exports = router;