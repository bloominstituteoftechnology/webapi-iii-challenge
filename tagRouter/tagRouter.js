const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');


router.get('/', (req, res)=>{
    // const { id } = req.params;
    db
    .get()
    .then(tags=>{
        res.json(tags);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})
router.get('/:id', (req, res)=>{
    const { id } = req.params;
    db
    .get(id)
    .then(tag=>{
        res.json(tag);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

router.post('/', (req, res)=>{
    const  tag  = req.body
    
    if(tag.tag === undefined || tag.tag.length > 80){
        res.status(400).json({error:'cannot be undefined or length should not be more than 80 chars'})
    }

     db.get()
     . then(tags=>{
         tags.forEach(element => {
             if(element.tag=== tag.tag) res.status(400).json({error:'The tag should be unique'})
         });
     })
     .catch(error=>{
         res.status(500).json({error:'server error'})
     })
     
    
     db
    .insert(tag)
    .then(newId=>{
        res.json(newId)
        console.log(newId);

    })
    .catch(error =>{
        res.status(500)
        console.log(error)
        res.json({error:'there was error entering to the database'});
    })
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    db
    .remove(id)
        .then(deleted=>{
        if (deleted===1) res.json({success:  `the post at ${id} was deleted` }) 
        if(deleted === 0) res.status(400).json({error:'the post with the given id doesnt exist'})
      })
    .catch(error=>{
        res.status(500).json(error)
    });
});



router.put("/:id", (req, res)=>{
    const tag = req.body;
    const {id } = req.params;
    
    if(tag.tag === undefined || tag.tag.length > 80){
        res.status(400).json({error:'cannot be undefined or length should not be more than 80 chars'})
    }
    
     db.get()
     . then(tags=>{
         tags.forEach(element => {
             if(element.tag=== tag.tag) res.status(400).json({error:'The tag should be unique'})
         });
     })
     .catch(error=>{
         res.status(500).json({error:'server error'})
     })

   
    db
    .update(id, tag)
    .then(tag=>{
        res.status(200).json(tag)
    })
    .catch(error =>{
        res.status(500).json(error);
    })
})
module.exports=router;