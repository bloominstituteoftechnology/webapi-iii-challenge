const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js')
const db2 = require('../data/helpers/userDb.js')

router.get('/', (req, res)=>{
     db
    .get()
    .then(posts=>{
        res.json(posts);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

router.get('/:id/tags', (req, res)=>{
    const { id } = req.params;
    db
    .getPostTags(id)
    .then(posts=>{
        res.json(posts);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    db
    .get(id)
    .then(post=>{
        res.json(post);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})
router.post('/', (req, res)=>{
    const { userId } = req.body;
    let userExist=false;
    console.log(userId, 'userId');
    db2.get()
    .then(users=>{
        users.forEach(user=>{
            if(user.id===userId) userExist=true
        })
        if(!userExist){
                res.status(400).json({error:'User does not exist'});
            }
        if(typeof req.body.text !== 'string')   res.status(400).json({error:'text should be a string'})
        console.log(userExist, 'userExists');
        })
    .catch(error=>{
        res.status(500).json({error:'Server Error'})
    })
    const post = req.body;
    db
    .insert(post)
    .then(response=>{
        db
        //  res.json(response)
        .get(response.id)
        .then(post=>{
        res.json(post);
        })
        .catch(error=>{
        res.status(500).json(error);
         })
    })
    .catch(error =>{
        res.status(500)
        res.json({error:'there was error entering to the database'});
    })
})

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    db
    .remove(id)
        .then(deleted=>{
        if (deleted===1) res.json({success:  `the tag at ${id} was deleted` }) 
        if(deleted === 0) res.status(400).json({error:'the tag with the given id doesnt exist'})
      })
    .catch(error=>{
        res.status(500).json(error)
    });
});



router.put("/:id", (req, res)=>{
    const {id } = req.params;
    const post = req.body;
    db
    .update(id, post)
    .then(posts=>{
        res.status(200).json(post)
    })
    .catch(error =>{
        res.status(500).json(error);
    })
})

module.exports=router;