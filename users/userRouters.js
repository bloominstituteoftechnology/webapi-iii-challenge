const express = require('express');
const userdb = require('../data/helpers/userDb');

const router = express.Router();

//middleware
router.use(express.json());
//custom middleware will go into separat file eventually
function nameCap(req, res, next) {
    //reassign the req's name value with one where all first letters have been capitalized
       req.body.name=req.body.name.toLowerCase().split(' ').map(word=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    //then call the next middleware (in this example, the POST and PUT routehandlers)
       next();
   }

   //endpoints for userdb CRUD methods
//GET /api/users/
router.get('/', (req, res) =>{
    userdb.get()
    .then(users=>{res.status(200)
        .json(users)
    })
    .catch(error =>{res.status(500)
        .json({error: "The users could not be retrieved."})
    })
})

//GET by id /api/users/:id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    userdb.get(id)
    .then(user => {res.status(200)
        .json(user);
    })
    .catch(error => {res.status(500)
        .json({message: "The user info could not be retrieved."})
    })
})

//POST /api.users/
router.post('/', nameCap, async (req, res) => {
    const {name} = req.body;
    
    if (!name) {
    res.status(400)
    .json({message: "Please provide a name for the new user."})
    } else {
        try {
        const userInfo = req.body;
        const userId  =await userdb.insert(userInfo);
        res.status(201).json(userId);
        } catch (error) {
        res.status(500).json({error: "An error occurred while saving this user."})
    }
    }
})

//UPDATE /api/users/:id
router.put('/:id', nameCap, (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.name) {res.status(400)
        .json({error: "Please provide the updated user's name."})
    } else {
        userdb.update(id, changes)
        .then(count => {
            if (count) {
            res.status(200)
            .json(count);
            } else {
                res.status(404)
                .json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500)
            .json({error: "The user info could not be modified."})
        })
    }
})

//DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    userdb.remove(id)
    .then(count=>{
        if (count) {
        res.status(200)
        .json(count);
        } else {
            res.status(404)
            .json({message: "The user with the specififed ID does not exist."})
        }
    })
    .catch(error=>{
        res.status(500)
        .json({error: "The user could not be removed."})
    })
})


module.exports = router;