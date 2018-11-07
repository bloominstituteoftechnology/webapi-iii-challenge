
const express = require('express');
const router = express.Router();
const db = require('./userDb');




router.get('/', async (req, res)=>{
    
    const users = await db.get();
    try{
        res.status(200).json(users)
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }

});

router.get('/:id/posts', async (req, res)=>{
    let {id} = req.params;
    let userPosts = await db.getUserPosts(id);

    try{
        res.status(200).json(userPosts);
    }
    catch(er){
        res.status(500).json({message: 'There was an error retrieving the data'})
    }
});

router.get('/:id/posts', ()=>{
    
});

router.post('/:id', ()=>{

})

router.put('/:id', ()=>{


})



router.delete('/:id', ()=>{


})





module.exports = router;