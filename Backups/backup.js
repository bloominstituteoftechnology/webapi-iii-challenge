// // Gets all the users
// server.get('/api/users', (req, res) => {
//   userDb
//     .get()
//     .then(users => res.status(200).json(users))
//     .catch(error =>
//       res
//         .status(500)
//         .json({ message: 'There has been an error getting the users.' })
//     );
// });
// // Gets specific user
// server.get('/api/users/:id', (req, res) => {
//   const id = req.params.id;

//   userDb
//     .get(id)
//     .then(user => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'Unable to find user' });
//       }
//     })
//     .catch(error =>
//       res
//         .status(500)
//         .json({ message: 'Error has occurred while fetching user' })
//     );
// });
// // Adds a new user
// server.post('/api/users', (req, res) => {
//   const newUser = req.body;
//   if (!req.body.name) {
//     res.status(400).json({ message: 'You are missing a name.' });
//   }
//   userDb
//     .insert(newUser)
//     .then(user => res.status(200).json(user))
//     .catch(error =>
//       res
//         .status(500)
//         .json({ message: 'There was a problem added the new user.' })
//     );
// });
// // Deletes a user
// server.delete('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   userDb
//     .remove(id)
//     .then(count => {
//       if (count) {
//         res
//           .status(200)
//           .json({ message: `User with the id of ${id} was deleted.` });
//       } else {
//         res.status(404).json({
//           message: 'The user you wish to delete can not be found.'
//         });
//       }
//     })
//     .catch(error =>
//       res.status(500).json({ message: 'There was an error deleting the user.' })
//     );
// });
// // Updates a user
// server.put('/api/users/:id', uppercase, (req, res) => {
//   const id = req.params.id;
//   const update = req.body;

//   userDb
//     .update(id, update)
//     .then(count => {
//       if (count) {
//         res
//           .status(200)
//           .json({ message: `User with the id of ${id} has been updated` });
//       } else {
//         res.status(404).json({ message: 'User could not be found' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ message: 'Error updating the user.' });
//     });
// });
