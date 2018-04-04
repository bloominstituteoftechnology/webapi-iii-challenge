const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb.js');

// handles routes that start with: /api/users

router.get('/', (req,res) => {
    // get data
     db.get()
     // send the data
     .then(users => {
         res.json(users);
     })
     // send error if there is one
     .catch(error => {
         res.status(500).json(err);
     });
});

// router.get('/:id/orders', (req, res) => {
//     res.send(`viewing orders for user with id ${req.params.id}`);
// });

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.findById(id).then(users => {
//         res.json(users[0]);
//     }).catch(error => {
//         res.status(500).json(err);
//     });
// });

// router.post('/', (req, res) => {
//     const user = req.body;
//     db.insert(user)
//     .then(response => {
//         res.status(201).json(response)
//     })
//     .catch(error => {
//         res.status(500).json({ error: "The users information could not be retrieved." })
//     })
// })

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     let user;

//     db.findById(id)

//     .then(response => {
//         user = {...response[0]};
        
//         db.remove(id)
//         .then(response => {
//             res.status(200).json(user);
//         })
//         .catch(error => {
//             res.status(500).json(error);
//         })
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     })
// })

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const update = req.body;

//     db.update(id, update)
//     .then(count => {
//         if (count > 0) {
//             db.findById(id).then(updatedUsers => {
//                 res.status(200).json(updatedUsers[0])
//             })
//         } else {
//             res.status(404).json({ message: "The user with the specified ID does not exist." })
//         }
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

module.exports = router;
