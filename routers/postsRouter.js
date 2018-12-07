//grab database methods
const postdb = require('../data/helpers/postDb')

const express = require('express')
const router = express.Router();

//Middleware 
//...


//Route Handlers
//***POSTS ROUTE HANDLERS *** */
//Get post with the specified ID
router.get('/:id', (req,res) =>{
    const id = req.params.id;
    postdb.get(id)
    .then(posts =>{
        if(posts){
            res.json(posts)
        }else{
            res.status(404)
            res.json({error: "There is no post associated with the specified id"})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to retrieve posts"})
    });
});


module.exports = router;