import UserHelpers from '../data/helpers/userDb';
import db from '../data/seeds/02-users';

// GET USER
const UserController = {
  getUsers: (req, res) => {
    db
      UserHelpers.get()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  getUser: (req, res) => {
    db
      UserHelpers.get(req.params.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  getUserPosts: (req, res) => {
    db
      UserHelpers.getUserPosts(req.params.id)
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  createUser: (req, res) => {
    db
      UserHelpers.insert(req.body)
      .then(newUser => {
        res.json(newUser);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }, 

  updateUser: (req, res) => {
    db
      UserHelpers.update(req.params.id, req.body)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  deleteUser: (req, res) => {
    db
      UserHelpers.remove(req.params.id)
      .then(user => {
        res.json({ msg: 'User deleted.' });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
} 

export default UserController;