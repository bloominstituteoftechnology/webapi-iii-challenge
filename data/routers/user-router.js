const express = require('express');

const UserData = require('../helpers/userDb.js');

const router = express.Router(); // notice the Uppercase "R" in Router



// GET

router.get('/', async (req, res) => {
  try {
      const users = await UserData.get(req.query);
      res.status(200).json(users);
  } catch (error) {
     // log error to database
      console.log(error);
      res.status(500).json({ error: "The users information could not be retrieved." });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {

        const user = await UserData.getById(req.params.id);

        if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The user information could not be retrieved." });
  } 
});

//POST

router.post('/', async (req, res) => {

  if (!req.body.name) {
     res.status(400).json({ errorMessage: "Please provide a name for the user." });
 } else {    
     try {
         const user = await UserData.insert(req.body);
         res.status(201).json(user);
     } catch (err) {
      res.status(500).json({error: "There was an error while saving the post to the database."});
    }
 }


});


//PUT (Update)

router.put('/:id', async (req, res) => {

  if (!req.body.name) {
     res.status(400).json({ message: "Please provide a name for the user." });
 } else {  
     try {
         const user = await UserData.update(req.params.id, req.body);

          if (user) {
             res.status(200).json(user);
         } else {
             res.status(404).json({ message: "The user with the specified ID does not exist." });
         }
     } catch (error) {
         // log error to database
         console.log(error);
         res.status(500).json({ error: "The user information could not be modified." });
     }
 }
});

module.exports = router;