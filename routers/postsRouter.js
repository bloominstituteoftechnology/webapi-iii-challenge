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
    .then(post =>{
        if(post){
            res.json(post)
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

//Insert post into the database
router.post('/', (req,res) =>{
    const post = req.body;
    if(post.text && post.userId){
        postdb.insert(post)
        .then(id =>{  
            res.status(201)
            res.json(id)
        })
        .catch(err => {
            res.status(500)
            res.json({error: "Unable to create a new post"})
        })
    }else{
        res.status(400)
        res.json({error: "Post is missing the userId or the text"})
    }

});

//Delete specified post
router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    postdb.get(id)
    .then(post =>{
        if(post){
            postdb.remove(id)
            .then(count =>{
                res.json(post)
            })
        }else{
            res.status(404)
            res.json({error: "There is no post associated with the specified id"})
        }
    })
    .catch(err =>{
        res.status(500)
        res.json({error: "Unable to delete specified post"})
    })
});

//Update a specified post
router.put('/:id', (req,res) =>{
    const id = req.params.id;
    const post = req.body;
    if(post.userId && post.text){
        postdb.update(id, post)
        .then(count =>{
            if(count){
                postdb.get(id)
                .then(post =>{
                    res.json(post)
                })
            }else{
                res.status(404)
                res.json({error: "There is no post associated with the specified id"})
            }
        })
        .catch(err =>{
            res.status(500)
            res.json({error: "Unable to update specified post"})
        })
    }else{
        res.status(400)
        res.json({error: "Post is missing the userId or the text"})
    }

});

module.exports = router;