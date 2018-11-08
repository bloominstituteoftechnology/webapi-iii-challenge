
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

router.get('/:id', async (req, res)=> {
    let userID = req.params.id;
    let posts = await db.get(userID);

    if(posts){
    try{
        res.status(200).json({message: 'The '})
    }
    catch(err){
       
    }
}

})



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
    let { id } = req.params;
    let post = req.body;
    let prevPost = await db.get(id);
    console.log(prevPost);
    db.update(id, post)
    .then(r => res.status(200).json({message: `${prevPost.text} has been changed to ${post.text}`}))
    .catch(err => res.status(500).json({message: 'There was an error processing the data'}) )

})



router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    
    
    let deletion = await db.remove(id);
    

    try{console.log(post)
        res.status(200).json({message: `Message has been deleted`})
    }
    catch(err){
        if(!deletion){
            res.status(404).json({message: 'Post Not Found'})
        }
        else{
        res.status(500).json({message: 'There was an error processing your request'})
        }
    }

})






module.exports = router;