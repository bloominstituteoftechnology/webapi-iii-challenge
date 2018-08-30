const express = require('express');
const users = require('../../data/helpers/userDb');

const router = express.Router();

//custom user middleware
const capitalizeUsername = (req, res, next) => {
  if(!req.body.name) {
    // res.status(422).json({ error: "A name is required" })
    next({ errorCode: 422, errorMessage: 'A name is required' });
  }else{
    req.body.name = req.body.name.toLowerCase().split(' ').map(n => n.charAt(0).toUpperCase() + n.substring(1)).join(' ');
    next();
  }
}

// USER end points

//get all users
router.get('/', (req, res) => {
  users.get()
        .then(usrs => res.status(201).json(usrs))
        .catch(err => res.status(500).json({ error: "User information retrieval failed." }));
});

//get user by id
router.get('/:id', (req, res) => {
  users.get(req.params.id)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: `Failure Retrieving User with id ${req.params.id}.` }));
});

//get posts by user id
router.get('/:id/posts', (req, res) => {
  users.getUserPosts(req.params.id)
        .then(usrPosts => res.status(201).json(usrPosts))
        .catch(err => res.status(500).json({ error: "User's Post information retrieval failed." }));
});

//create new user
router.post('/', capitalizeUsername, (req, res) => {
  const { name } = req.body;
  users.insert({ name })
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ error: "Database Failure on Inserting New User" }));
});

//remove a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users.remove(id)
        .then(deleted => deleted === 1 ?
                          res.status(201).json({ message: `User with id ${id} deleted.`}) :
                          res.status(500).json({ error: "Invalid User ID" })
                        )
        .catch(err => res.status(500).json({ error: `Database Failure on Deleting User with id ${id}` }));

});

//change a user's name
router.put('/:id', capitalizeUsername, (req, res) => {
  const { id } =  req.params;
  const { name } = req.body;
  users.update(id, { name })
        .then(updated => updated === 1 ?
                          res.status(201).json({ message: `User with id ${id} updated.`}) :
                          res.status(500).json({ error: "Invalid User ID" }))
        .catch(err => res.status(500).json({ error: `Database Failure on Updating User with id ${id}` }));
});

module.exports = router;
