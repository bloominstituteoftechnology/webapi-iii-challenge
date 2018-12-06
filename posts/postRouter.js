const express = require('express');
const postDB = require('./data/helpers/postDb');
const router = express.Router();



router.get('/api/posts', (req, res) =>{
    postDB.get()
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err =>{
            res.status(500).json({error : 'Trouble fetching posts'})
        })
})

router.get('/api/posts/:id', (req ,res) =>{
    const {id} = req.params;
    postDB.getPostTags(id)
        .then(post =>{
            res.status(200).json(post)
        })
        .catch(err =>{
            res.status(500).json({error : 'Could not get post with specified ID'})
        })
})

router.post('/api/posts', (req, res) =>{
    const post = req.body;
    if(post.text && post.userId){
        postDB.insert(post)
            .then(newPost =>{
                res.status(201).json(newPost)
            })
            .catch(err =>{
                res.status(404).json({error : 'Missing post text or author'})
            })
    }else{
       res.status(500).json({message : 'Could not create new post'})
    }
})

router.delete('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
    let searchedPost ;
    postDB.get(id)
        .then(post =>{
            searchedPost = post
        })
    postDB.remove(id)
        .then(count =>{
            if(count){
                res.status(200).json(searchedPost)
            }else{
                rs.status(404).json({message : 'Could not find post with specified ID'})
            }
        })    
        .catch(err =>{
            res.status(500).json({error : 'Could not delete post'})
        })
})

router.put('/api/posts/:id', (req ,res) =>{
    const {id} = req.params;
    const post = req.body;
    if(post.text && post.userId){
        postDB.update(id, post)
            .then(post =>{
                res.json(post)
            })
            .catch(err =>{
                res.status(404).json({error : 'Missing post text or author'})
            })
    }else{
        res.status(500).json({message : 'Could not update post'})
    }
})