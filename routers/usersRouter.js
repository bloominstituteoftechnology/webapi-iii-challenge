//grab database methods
const userDb = require('../data/helpers/userDb')

const express = require('express')
const router = express.Router();

//Middleware 
//includes middleware.nameToUpper()
const middleware = require('../middleware');

//Route Handlers
//****USER ROUTE HANDLERS*************
//get all users
router.get('/', (req, res) =>{
    userDb.get()
       .then(users =>{
           res.json(users)
       })
       .catch(err =>{
           res.status(500)
           res.json({error: "Unable to retrieve users"})
       })
   });
   
//get specific user
router.get('/:id', (req, res) =>{
    const id = req.params.id;
    userDb.get(id)
    .then(user =>{
        if(user){
            res.json(user)
        }else{
            res.status(404)
            res.json({message: "The user with the specified id does not exist"})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to retrieve user"})
    })
});
   
//add user
router.post('/', middleware.nametoUpper,(req,res) =>{
    const user = req.body;
    if(user.name){
    userDb.insert(user)
        .then(id =>{
            res.status(201)
            res.json(id)
        })
        .catch(err =>{
            res.status(500)
            res.json({error: "Unable to add new user"})
        })
    }else{
        res.status(400)
        res.json({error: "missing name of user"})
    }
});
   
//delete user
router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    userDb.get(id)
    .then(user =>{
        if(user){
        userDb.remove(id)
            .then(count =>{
                if(count){
                    res.status(200)
                    res.json(user)
                }else{
                    res.status(404)
                    res.json({message: "The user with the specified id does not exist"})
                }
        
            })
        }else{
            res.status(404)
            res.json({message: "The user with the specified id does not exist"})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to delete user"})
    })
});
   
//update user
router.put('/:id', middleware.nametoUpper,(req, res) =>{
    const id = req.params.id;
    const user = req.body;
    userDb.update(id, user) //returns count of updated
    .then(count => {
        if(count){
        userDb.get(user.id)
            .then(user =>{
                res.json(user)
            })
        }else{
            res.status(404)
            res.json({error: "The user with the specified ID does not exist."})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to update user"})
    })
});

//***GET USER POSTS */
router.get('/posts/:id', (req, res) =>{
    const userId = req.params.id;

    userDb.getUserPosts(userId)
    .then(posts =>{
        if(posts[0]){
            res.json(posts)
        }else {
            res.status(404)
            res.json({error: "No posts were found for the specified user"})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to retrieve user's posts"})
    })
});


module.exports = router;