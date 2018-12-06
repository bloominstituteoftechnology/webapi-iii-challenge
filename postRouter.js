const express = require('express');

const postDB = require('./data/helpers/postDb');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res)=>{
    postDB.get()
    .then(posts=>{
        res.json(posts);
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'});
    })
});

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    postDB.get(id)
    .then(post=>{
        if(post){
            res.json(post);
        }
        else{
            res.status(404).json({message: 'Post not found.'})
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'});
    })
})

router.post('/', (req, res)=>{
    const newPost = req.body
    if(newPost.text && newPost.userId){
        postDB.insert(newPost)
        .then(idObj=>{
            postDB.get(idObj.id)
            .then(post=>{
                res.json(post);
            })
        })
        .catch(error=>{
            res.status(500).json({error: 'The information could not be retrieved.'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please provide post text and user id.'});
    }
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    postDB.get(id)
    .then(postToDelete=>{
        if(postToDelete){
            postDB.remove(id)
            .then(count=>{
                if(count){
                    res.json(postToDelete);
                }
                else{
                    res.status(500).json({error: 'The post could not be removed.'});
                }
            })
        }
        else{
            res.status(404).json({message: 'Post not found.'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The post could not be removed.'});
    })
});

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const post = req.body;
    if(post.text && post.userId){
        postDB.update(id, post)
        .then(count=>{
            if(count){
                postDB.get(id)
                .then(post=>{
                    res.json(post);
                })
            }
            else{
                res.status(404).json({message: 'Post could not be found'});
            }
        })
        .catch(error=>{
            res.status(500).json({error: 'The post could not be modified.'})
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please provide post text and user id.'});
    }
});

module.exports = router;