// const express = require('express');
// const router = express.Router();

// const userDB = require('../data/helpers/userDB.js');

// //ROUTES - GET Enpoint
// router.get('/api/users', (req, res) => {
//     userDB
//         .get()
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(err => {
//             res.status(500).json({err: 'Could Not Retrieve Users'})
//         })
//   });

//   router.get('/api/users/:id', (req, res) => {
//       const {id} = req.params;
//       userDB
//         .get(id)
//         .then(gotUser => {
//             res.status(200).json(gotUser)
//         })
//         .catch(err => {
//             res.status(500).json({err: `Could Not Retrieve User ${gotUser}`})
//         })
//   });

//   //ROUTES - POST Endpoint
//   router.post('/', (req, res) => {
//       const { name } = req.body;
//       const newUser = { name };
//     //   if (!name) {
//     //       res.status(400).json({ error: 'No Name Provided' });
//     //   }else{
//         userDB
//         .insert(newUser)
//         .then(userId => {
//             userDB
//                 .get(userId)
//                 .then(user => {
//                     res.status(200).json(user)
//                 })
//         })
//         .catch(err => {
//             res.status(500).json({err: `Could Not Create New User`})
//         })
//     //   }
//   });

//   //ROUTES - DELETE Endpoint
//   router.delete('/:id', (req, res) => {
//       const {id} = req.params
//       userDB
//         .remove(id)
//         .then(removedUser => {
//             if (removedUser === 1) {
//                 res.status(200).json(removedUser)
//             }else {
//                 res.status(500).json({err: `User with Id${id} has Already been Removed`})
//             }
//         })
//         .catch(err => {
//             res.status(500).json({err: `Could Not Find User to be Removed`})
//         })
//   });
  
//   //ROUTES - UPDATE Endpoint
//   router.put('/api/users/:id', (req, res) => {
//       const { id } = req.params
//       const { name } = req.body
//       const existingUser = { name }
//       userDB
//         .update(id, existingUser)
//         .then(updatedUser => {
//             res.status(200).json(updatedUser)
//         })
//         .catch(err => {
//             res.status(500).json({err: `Could Not Update User ${existingUser}`})
//             return; 
//         })
//   });

//   module.exports = router;
