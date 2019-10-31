const express = require('express');
const router = express.Router();

//Import function model
Users = require('./userDb.js');

//Import function model
Posts = require('../posts/postDb');

////////////////////////

//WORKING
// router.post('/', validateUser, (req, res) => {
//     Users.insert(req.body)
//     .then(user => {
//         res.status(200).json(user)
//     })
//     .catch(err => {
//         res.status(500).json({ message: "Unable to add user"})
//     })
// });

//WORKING
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ err: "error"})
    })
})

//WORKING
// router.post('/', validateUser, (req, res) => {
//     const postUser = req.body;

//     Users.insert(postUser)
//     .then(hub => {
//       res.status(201).json(hub);
//     })
//     .catch(error => {
//       // log error to server
//       console.log(error);
//       res.status(500).json({
//         message: 'Error adding the hub',
//       });
//     });
//   });
  

//WORKING
// router.post('/', validateUser, (req, res) => {

//     Users.insert(req.body)
//     .then(user => {
//         console.log(user)
//         res.status(200).json(user);
//     })
//     .catch(err => {
//         res.status(500).json({ err: "unable to post user"})
//     })
// });

//WORKING
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const insertPost = {...req.body, user_id: req.params.id};
    Posts.insert(insertPost)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ err: "Failed to insert post"})
    })
});

//WORKING
router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "error retrieving users"})
    })
});

//WORKING
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(req.params.id)
    .then(users => {
      if (id) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the user',
      });
    });
});

//WORKING
router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;
    Users.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ err: "failed"})
    })
});

//WORKING
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(id)
    .then(user => {
        Users.remove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ err: "Unable to delete"})
        })
    })
});

//WORKING
router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const editUser = req.body;

    Users.update(id, editUser)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json({ err: "Failed to edit user"})
    })
});

//custom middleware

// - `validateUserId()`
//   - `validateUserId` validates the user id on every request that expects a user id parameter
//   - if the `id` parameter is valid, store that user object as `req.user`
//   - if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`

function validateUserId(req, res, next) {
    const id = req.params.id;

    Users.getById(id)
    .then(user => {
        if(user){
            next();
        } else {
            res.status(400).json({ message: "Id not found"});
        }
    })
    .catch(err => {
        res.status(500).json({ err: "Unable to validate user ID"})
    })
};

// - `validateUser()`
//   - `validateUser` validates the `body` on a request to create a new user
//   - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
//   - if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`

// function validateUser(req, res, next) {
//     !req.body && res.status(400).json({ message: "Couldnt find user"});
//     !req.body.name && res.status(400).json({ message: "Requires Name"});
//     next();
// };

// function validateUser(req, res, next){
//     if(req.body && Object.keys(req.body).length > 0){
//         next();
//     } else {
//         next({ message: "Unable to perform action"});
//     }
// }

function validateUser(req, res, next){
    const {name} = req.body;
    if(req.body){
        name
        ? next()
        : res.status(400).json({ message: "missing name"})
    } else {
        res.status(400).json({ message: "error"})
    }
}

// function validateUser(req, res, next){
//     if(!req.body){
//         res.status(400).json({ message: "User data not found"})
//     } else if (!req.body.name){
//         res.status(400).json({ message: "Requires Name"})
//     } else {
//         next();
//     }
// };

// - `validatePost()`
//   - `validatePost` validates the `body` on a request to create a new post
//   - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
//   - if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`

function validatePost(req, res, next) {
    !req.body && res.status(400).json({ message: "couldnt find post"});
    !req.body.text && res.status(400).json({ message: "Requires Text"});
    next();
};

module.exports = router;
