const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const tagDb = require('../data/helpers/tagDb.js');



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

    userDb
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({error: 'Users not found'})
    })


})

router.post('/', (req, res) => {
    const { name } = req.body;

    if(name < 1 || name > 128 ) {
        res.error(400).json({errorMessage: 'Your name must at least one character, and at most 128 characters long.'})
    }else{
    
    const newUser = { name }

    userDb
    .insert(newUser)
    .then(user => {
        res.status(201).json(`User ${newUser.name} created.`)
    })
    .catch(error => {
        res.status(500).json({error: 'User could not be created.'})
    })

    }
})

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if(name < 0 || name > 128 ) {
        res.error(400).json({errorMessage: 'Your name must at least one character, and at most 128 characters long.'})
    }else{
    
    const updateUser = { name }

    userDb
    .update(userId, updateUser)
    .then(update => {
        if(update === 0){
            res.status(404).json({message: 'The user does not exist.'})
        }
        else{
            res.status(200).json({message: `Updated User ${updateUser.name}`})
        }
        })

    .catch(error => {
        res.status(500).json({error: 'User could not be updated.'})
    })
    }

    })


router.delete('/:userId', (req, res) => {
    const { userId } = req.params;

    userDb
    .remove(userId)
    .then(deleted => {
        if( deleted === 0 ) {
            res.error(404).json({message: 'That user does not exist.'})
        }
        else{
            res.status(200).json({message: `User ${userId} deleted.`})
        }
    })
    .catch(error => {
        res.status(500).json('The user could not be deleted')
    })

})





router.get('/:userId', (req, res) => {
    const {userId} = req.params
    userDb
    .get(userId)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({error: 'User dont exist.'})
    })


})

// router.get('/:userId/posts', (req, res) => {
//     const {userId} = req.params

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         res.status(200).json(post);
//     }) 
//     .catch(error => {
//         res.status(500).json({error: 'That user has no legs :(.'})
//     })

// })

    
// router.get('/:userId/:postId', (req, res) => {
// const {userId} = req.params;
// const {postId} = req.params;

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         postDb
//         .get(postId)
//         .then(userPost => {
//         res.status(200).json(userPost);
//         })
        
//     })
//     .catch(error => {
//         res.status(500).json({error: 'That users legs have no legs :(:('})
//     })
// });

// router.get('/:userId/:postId/:tagId', (req, res) => {
//     const {userId} = req.params;
//     const {postId} = req.params;
//     const {tagId} = req.params;

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         postDb
//         .get(postId)
//         .then(userPost => {
//         tagDb
//         .get(tagId)
//         .then(postTag => {
//             res.status(200).json(postTag)
//         })

//         })
//     .catch(error =>{
//         res.status(500).json({error: 'Go deeper down the rabbit hole.'})
//     })    
//     })
// })




// server.get('api/users/search/posts', (req, res) => {
//     const { p } = req.body;
// })

module.exports = router;
