const express = require("express");

const router = express.Router();

const db = require('../data/helpers/postDb')

router.get('/',(req,res)=>{
    db
    .get()
    .then(posts =>{
        res.json(posts)
    })
    .catch(error=>{
        res.status(500).json({error: "darn this error"})
    })
})

router.get('/:id', (req,res) =>{
    const { id } = req.params

    db
    .get(id)
    .then(user=>{
    res.json(user)
})
.catch(error =>{
    res.status(500).json({error: "darn this error"})
})

})
router.post('/',(req,res)=>{
    const post = req.body;
    db
    .insert(post)
    .then(response =>{
    res.json(response)

    })
    .catch(error =>{
        res.status(500).json({error: "darn this error"})
    })
})

router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    let post;

    db
    .get(id)
    .then(response =>{
        post = { ...response[0] }
        db
        .remove(id)
        .then(response =>{
            res.status(200).json(post)
        })
        
    })
    .catch(err =>{
        res.status(500).json({error:"this darn error"});    
      }); 

})


router.put('/:id', (req,res)=>{
    const { id } = req.params
    const update = req.body;
    db
    .update(id, update)
    .then(count =>{

        if(count > 0){
            db
            .get(id)
            .then(posts =>{
            
                res
                .status(200)
                .json(posts[0]);
            })
        } else{
            res.status(400)
            .json({message:"this post does not exist"})
        }
    })
    .catch(err=>{
        res.status(400).json({error: "There was an error while saving the post to the database"});
    });
});
module.exports = router;