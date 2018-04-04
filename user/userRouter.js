const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig.js');


// router.get('/search', (req, res) => {
//     const { id } = req.query

//     db
//     .findbyId(id)
//     .then(user => {
//         if(user.length === 0){
//             res.status(404).json({error: 'That user does not exist.'})
//         }
//         else{
//         res.json(user[0]);
//         }
//     })
//     .catch(error => {
//         res.status(500).json({error: 'User information could not be retrieved.'})
//     })
// })

router.get('/', (req, res) => {
    db
    // .then(users => {
    //     res.json(users);
    // })
    .catch(error => {
        res.status(500).json({error: 'No users were found.'})
    })

})



// server.get('api/users/search/posts', (req, res) => {
//     const { p } = req.body;
// })

module.exports = router;
