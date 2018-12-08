const express = require('express');
const router = express.Router();

//Database
const dbUsers = require('../data/helpers/userDb');

//Middleware
const middleware = require('../custom_middleware');
// router.use(middleware.uppercase);

router.get('/', (req,res) => {
   dbUsers.get()
          .then(users => {
              //  console.log(users);
               res.json(users);
          })
          .catch(err => {
               res.status(500).json({errorMessage: ""})
          });
});


//Get the users and posts by ID
router.get('/:id', (req,res) => {
    const {id} = req.params;
    console.log(id);
    dbUsers.get(id)
           .then( user => {
               if(user) { 
               res.json(user);
               }
                else {
                // 404 invalid ID.
                    res.status(404).json({ message: "The post with the specified ID does not exist."});
               }
           })
           .catch(err => {
              res.status(500).json({errorMessage: "The user information could not be retrieved."})
         });
});

router.get('/:id/posts', (req,res) => {
    const {id} = req.params;
    dbUsers.getUserPosts(id)
           .then(userPosts => {
               userPosts ? res.status(201).json(userPosts) : res.status(404).json({errorMessage: "Does not exist"})
           }). catch(err => {
                res.status(500).json({errorMessage:"Could not get the user posts--something wrong"})
           })
})

//Server put
router.put('/:id', middleware.uppercase, (req,res) => {
      const {id} = req.params;
      const user = req.body;
      
      if(user.name) {
           dbUsers.update(id, user)
                  .then( count => {
                      if(count) {
                          dbUsers.get(id)
                                  .then(user => {
                                       res.status(201).json({Message: "Updated successfully"})
                                  })
                       } else {
                          res.status(404).json({errorMessage: "There is no user with that ID"});
                      }

                   })
                  .catch( err => { // 500 error
                       res.status(500).json({errorMessage: "User could not be modified"});
                  });
      } else {
           res.status(400).json({Message:"User name required"});
      }
});

router.post('/', middleware.uppercase, (req,res)=> {
      const user = req.body;
      if(user.name) {
          dbUsers.insert(user)
                 .then(userId => {
                      console.log(userId)
                   dbUsers.get(userId.id)
                          .then(newUser => {
                               if(newUser) {
                                   res.status(201).json(newUser);
                               } else {
                                   res.status(404).json({errorMessage:"There is no user with that ID"})
                               }
                          })

                 })
                 .catch(err => {
                      res.status(500).json({errorMessage: "Could not create user at this time"});
                 });
      } else {
         res.status(400).json({errorMessage: "User name is required"})
      }    
});

router.delete('/:id', (req,res)=> {
     const {id} = req.params;
     dbUsers.remove(id)
            .then(count => {
                 if(count) {
                      res.json({Message: "Successfully deleted"});
                 } else {
                     res.status(404).json({errorMessage:"Could not find the user with that ID"});
                 }
            }).catch(err => {
                 res.status(500).json({errorMessage:"Something went wrong deleting the user"});
            });
});



module.exports = router;