const express = require('express');

const userDb =  require ('../data/helpers/userDb.js')
const router = express.Router();

const middleware = (req, res, next) =>{
    const name = req.body.name;
    if(name){
        req.body.name = req.body.name.toUpperCase();
    }
    next();
}

router.use(middleware)


router.get('/', (req, res) =>{
    userDb.get()
    .then(user =>{
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message:"trouble getting users"})
    })
})

router.get('/:id', (req, res) =>{
    const  { id } = req.params;
    userDb.get(id)
    .then(user =>{
        if(user){//not sure why user.length > 0 gives me the message in my else statement for all ids
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"The user with the specified id does not exist"})
        }
    }).catch(err => {
        res.status(500).json({message:"trouble getting user"})
    })
})

router.get('/:id/posts', (req, res)=>{
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(user =>{
            if(user.length > 0){
                res.status(201).json(user)
            }else{
                res.status(404).json({message:"The user with the specified id does not have any posts or does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"You messed up in the UserPosts"})
        })
})


router.post('/', middleware, (req, res) =>{
    const data = req.body;
    if(!data.name){res.status(400).json({message:"Please provide a name"})}
    userDb.insert(data)
    .then(user =>{
        res.status(201).json(user)
    }).catch( err =>{
        res.status(404).json({message:"Could not update User"})
    })
})


router.put('/:id', middleware, (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.name){
        userDb.update(id, data).then(count =>{
            if(count){
                userDb.get(id).then(user =>{
                    res.json(user)
                }).catch(err=>{
                    res.status(500).json({message:"Could not retrun the user"})
                })
            }else{
                res.status(404)
                .json({message:"The user with the specified id does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error with updating user in database"})
        })

    }else{
        res.status(400).json({message:"Missing a valid name"})
    }
})


router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    userDb.remove(id)
    .then(remove =>{
            if(remove){
                res.status(200).json({message:"It was deleted"})
            }else{
                res.status(500).json({message:"id does not exist"})
            }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed" })
    })

})

module.exports = router;