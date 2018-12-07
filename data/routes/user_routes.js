const express = require('express');
const userDB = require('../helpers/userDb')
const CMW = require('../helpers/custom_middleware')


const router = express.Router();

router.get('/', (req, res)=>{
    userDB.get()
        .then((users)=>{
            res.json(users)
        })
        .catch(err=>{
            res.status(500)
            .json({message: "problem grabbing the Users"})
        })
});

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    userDB.get(id)
        .then(user=>{
            user?
                res.json(user):
                res.status(404)
                .json({ message: "Specific User doesn't exsist"})
            
        })
        .catch(err=>{
            res.status(500)
                .json({ message:"Trouble fetching that User"})
        })
})

router.post('/add',CMW.upperCase, (req, res)=>{
    const data = req.body;
        userDB.insert(data)
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(err=>{
                res.status(500)
                    .json({ message: "Trouble adding new user "})
            })
})

router.put('/update/:id', CMW.hasName, CMW.upperCase, (req, res)=>{
    const {id}=req.params;
    const  data = req.body;
    userDB.update(id, data)
        .then(number =>{
            res.status(201).json({number:number})
        })
        .catch(err=>{
            res.status(500)
            .json({message: "Trouble updating user"})
        })
})

//using getuserpost
router.get('/posts/:id', (req, res)=>{
    const { id } = req.params;
    userDB.getUserPosts(id)
    .then(posts=>{
        posts.length !== 0?
        res.json(posts):
        res.status(404)
            .json({message: "no posts found for this User"})
    })
    .catch(err=>{
        res.status(500)
            .json({ message: "trouble getting posts for this User"})
    })
    
})

module.exports = router;