
const express = require('express');
const router = express.Router();
const db = require('./postDb');


function userIDMW(req, res, next) {
    req.body.userID = req.params.id;
    next();
}


router.get('/', async (req, res)=>{
    
    const posts = await db.get();
    try{
        res.status(200).json(posts)
    }
    catch(er){
        res.status(500).json({message: 'Could not return information.'})
    }

});



router.post('/:id', userIDMW, (req, res)=>{
     
    let text = req.body;
    console.log(text);
    if(text){
    db.insert(text)
    .then(r => res.status(200).json(r))
    .catch(err => res.status(500).json(err));
}
    else{
        res.status(400).json({message: 'Please retry with the right parameters.'})
    }
})

router.put('/:id', async (req, res)=>{
    let {id} = req.params;
    let user = req.body;
    let prevName = await db.get(id);

    db.update(id, user)
    .then(r => res.status(200).json({message: `${prevName.name} has been changed to ${user.name}`}))
    .catch(err => res.status(500).json({message: 'There was an error processing the data'}) )

})



router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    let user = await db.get(id);
    let deletion = await db.remove(id);

    try{
        res.status(200).json({message: `${user.name} has been deleted`})
    }
    catch(er){
        if(!user){
            res.status(404).json({message: 'User Not Found'})
        }
        else{
        res.status(500).json({message: 'There was an error processing your request'})
        }
    }

})






module.exports = router;