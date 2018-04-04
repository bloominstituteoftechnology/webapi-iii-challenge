const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');



router.get('/', (req, res) => {
   db

     .get()
     .then(users => {
         res.json(users);
     })
     .catch(error => {
         res.status(500).json({ error: "A list of users could not be retrieved." });
     })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    db

     .get(id)
     .then(user => {
         if (user === undefined) {
             res.status(404).json({ error: "User ID ${id} could not be found"});
         } else {
             res.status(200).json(user)
         }       
     })
     .catch(error => {
         res.status(500).json({ error: "Could not retrieve user information." });
     })
})


module.exports = router;

