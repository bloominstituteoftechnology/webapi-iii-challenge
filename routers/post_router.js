const express = require('express');

const postDb = require('../data/helpers/postDb.js');
const router = express.Router();


router.get('/', (req, res) =>{
    postDb.get()
    .then(posts =>{
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})

router.get('/:id', (req, res) =>{
    const  { id } = req.params;
    postDb.get(id)
    .then(posts =>{
        if(posts){ //not sure why posts.length > 0 gives me the message in my else statement for all ids
            res.status(200).json(posts)
        }else{
            res.status(404).json({message:"The post with the specified id does not exist"})
        }
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})


router.post('/', (req, res) =>{
    const data = req.body;
    if(!data.userId || !data.text){res.status(400).json({message:"Please provide a userId and text"})}
    postDb.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(404).json({message:"There was an error while saving the user to the database"})
    })
})

router.put('/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.userId && data.text){
        postDb.update(id, data).then(count=>{
            if(count){
                postDb.get(id).then(user=>{
                    res.json(user)
                }).catch(err=>{
                    res.status(500).json({message:"Could not return user!"})
                })
            }else{
                res.status(404)
                .json({message:"The post with the specified Id does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error with updating post in database"})
        })
    }else{
        res.status(400).json({message:"Missing a valid userId and text"})
    }
})

router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    postDb.remove(id)
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