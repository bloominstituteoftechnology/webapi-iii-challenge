const express = require('express');
const userDB = require('../data/helpers/userDb.js');
const router = express.Router();


router.get('/', (req, res) =>{
    userDB.get()
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({error : 'Could not fetch user data'})
        })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    userDB.getUserPosts(id)
      .then(user =>{
          res.status(200).json(user)
      })  
      .catch(err =>{
          res.status(500).json({error : 'Could not fetch user by that ID'})
      })
})

router.post('/', (req ,res) =>{
    const newUser = req.body
    if(newUser.name){
        userDB.insert(newUser)
        .then(userId =>{
            userDB.get(userId.id)
                .then(user =>{
                    res.status(201).json(user)
                })
        })
        .catch(err =>{
            res.status(404).json({error: 'Missing name for new user'})
            
        })
    }else{
        res.status(500).json({error : 'Could not add new user'})
    }
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params;
    let searchedUser;
    userDB.get(id)
        .then(user =>{
            searchedUser = user
        });
    userDB.remove(id)
        .then(count =>{
            if(count){
                res.status(200).json(searchedUser)
            }else{
                res.status(404).json({message : 'Could not find user with specified ID'})
            }
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not remove user'})
        })    
})

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const user = req.body;
    if(user.name){
        userDB.update(id, user)
            .then(count =>{
                if(count){
                    userDB.get(id)
                        .then(user =>{
                            res.status(200).json(user)
                        })
                }else{
                    res.status(404).json({message : 'Could not find user with specified ID'})
                }
            })
            .catch(err =>{
                res.status(500).json({error : 'User could not be updated'})
            })
    }
})

module.exports = router