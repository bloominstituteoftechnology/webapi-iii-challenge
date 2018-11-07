
const express = require('express');
const router = express.Router();
const db = require('./postDb');




router.get('/', async (req, res)=>{
    
    const posts = await db.get();
    try{
        res.status(200).json(posts)
    }
    catch(er){
        res.status(500).json({message: 'Could not return information.'})
    }

});


router.post('/:id', ()=>{

})

router.put('/:id', ()=>{


})



router.delete('/:id', ()=>{


})





module.exports = router;