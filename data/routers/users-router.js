const express = require('express');
const router = express.Router();

const UserFuncs = require('../helpers/userDb.js')

router.get('/', async (req, res) => {
    const users = await UserFuncs.get();
    try {
        res.status(200).json(users)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error retrieving users"})
    }
});


module.exports = router;