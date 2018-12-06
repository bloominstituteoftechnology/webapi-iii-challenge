const express = require('express');
const userDB = require('../../data/helpers/userDb');

const router = express.Router();

const uppercaseNames = (req, res, next) => {
    const { name } = req.body;
    let result = name.split(' ');

    result = result.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
    result = result.join(' ');
    req.body.name = result;
    next();
};

// set up a get for all users to be DRY
const getUsers = (id, req, res) => {

    if (id) {
        userDB.get(id)
          .then(user => {
            if (user) {
            res.json({user})
            }
            else {
              res.status(404).json({error: "The user you are looking for does not exist"})
            }
          })
          .catch(err => {
            res.status(500).json({message: "Please try again later, cannot connect to database"})
          })
      }
      else {
        userDB.get()
              .then(users => {
                if (users) {
                  res.json({users: users})
                }
                else {
                  res.status(404).json({message: "Users does not exist. Please add a user to the Database first."})
                }
              })
              .catch(err => {
                res.status(500).json({error: "Cannot Get Users From Database at this time, Come back later"})
              })
      }
}

// ----------- SETUP USERS END POINTS ----------------


// ~~~~~~~~~~~ GET REQUEST USERS ~~~~~~~~~~~~~~~~~~~~
router.get('/', (req,res) => {
  return getUsers(null, req,res);
})

// ~~~~~~~~~~~ GET REQUEST FOR USER (ID) ~~~~~~~~~~~~~~~~~~~~
router.get('/:id', (req, res) => {
  const { id } = req.params;
  return getUsers(id, req, res);
})
// ~~~~~~~~~~~ GET REQUEST FOR USER POSTS ~~~~~~~~~~~~~~~~~~~~
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id)
        .then(posts => {
          if(posts.length === 0) {
            res.status(404).json({message: "This user has no posts or this User does not exist. Please try again"})
          }
          else {
            res.json({posts})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})
// ~~~~~~~~~~~ POST REQUEST FOR NEW USER ~~~~~~~~~~~~~~~~~~~~
router.post('/', uppercaseNames, (req, res, next) => {
  const { name } = req.body;
  userDB.insert({name})
        .then(userID => {
          res.json(userID)
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})

// ~~~~~~~~~~~ DELETE REQUEST FOR USER ~~~~~~~~~~~~~~~~~~~~
router.delete('/:id', (req, res) => {
  const { id } = req.params
  userDB.remove(id)
        .then(deleted => {
          if(deleted) {
            res.json({message: "user successfully deleted"})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})

// ~~~~~~~~~~~ UPDATEs REQUEST FOR USER ~~~~~~~~~~~~~~~~~~~~
router.put('/:id', uppercaseNames, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  userDB.update(id, {name})
        .then(count => {
          if (count) {
            res.json({message: "user successfully updated!"})
          }
          else {
            res.status(400).json({message: "User was not updated, Try again later."})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })

})

module.exports = router;
