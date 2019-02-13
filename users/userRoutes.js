const express = require('express');
const db = require('../data/helpers/userDb');
const router = express();

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        if(users){
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: 'We can\'t find any users'})
        }
    } 
    catch(error) {
        res.status(500).json('Sorry we\'re working on this issue')
    }
})

module.exports = router;