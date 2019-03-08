const express = require('express');

const UserData = require('../helpers/userDb.js');

const router = express.Router();


//castom middleware
const upperCaseMiddleware = (req, res, next) =>{
    if (!req.body.name) {
        res.status(400).json({ message: "Forgot about the name" });
      } else {
        req.body.name = req.body.name.toUpperCase();
        next();
      }
};



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

router.post('/', upperCaseMiddleware, async (req, res) => {

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

router.put('/:id', upperCaseMiddleware, async (req, res) => {

  
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
     };
    });


 //DELETE

 router.delete('/:id', async (req, res) => {
  try {
      const user = await UserData.remove(req.params.id);

       if (user > 0) {
          res.status(200).json({ message: "The post has been removed" });
      } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
  } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({ error: "The user could not be removed" });
  }
});
module.exports = router;