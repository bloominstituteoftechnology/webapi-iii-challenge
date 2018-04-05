const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js')

router.get('/', (req, res)=>{
    const { id } = req.params;
    db
    .get()
    .then(users=>{
        res.json(users);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})


router.get('/:id/posts', (req, res)=>{
    const { id } = req.params;
    db
    .getUserPosts(id)
    .then(users=>{
        res.json(users);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    db
    .get(id)
    .then(users=>{
        res.json(users);
    })
        .catch(error=>{
        res.status(500).json(error);
    })
})

router.post('/', (req, res)=>{
    const user = req.body
    if (user.name === undefined || user.name.length > 128 ) res.status(400).json({error:"name field required and 128 char-max"})
    db
    .insert(user)
    .then(user=>{
        res.json(user);
        res.status(201).json(users);
    })
    .catch(error =>{
        res.status(500)
        res.json({error:'there was error entering to the database'});
    })
})

router.delete('/:id', (req, res)=>{
    const { id } = req.params;
    db
    .remove(users=>{
        res.json(users)
    })
    .catch(error=>{
        res.status(500).json(error)
    });
});



router.put("/:id", (req, res)=>{
    const {id } = req.params;
    const post = req.body;
    if(user.name=== undefined || user.name.length> 128) res.status(400).json({error:'name field required and 128 char long'})
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