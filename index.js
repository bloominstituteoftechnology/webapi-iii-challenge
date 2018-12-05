const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb =  require ('./data/helpers/userDb.js')



const server = express();
server.use(express.json())
const PORT = 4000;

server.get('/post', (req, res) =>{
    postDb.get()
    .then(posts =>{
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})

server.get('/post/:id', (req, res) =>{
    const  { id } = req.params;
    postDb.get(id)
    .then(posts =>{
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})


server.get('/user', (req, res) =>{
    userDb.get()
    .then(user =>{
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message:"trouble getting users"})
    })
})

server.get('/user/:id', (req, res) =>{
    const  { id } = req.params;
    postDb.get(id)
    .then(user =>{
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message:"trouble getting user"})
    })
})

server.get('/user/:id/posts', (req, res)=>{
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(user =>{
            res.status(201).json(user)
        }).catch(err=>{
            res.status(500).json({message:"You messed up in the UserPosts"})
        })
})

server.post('/post', (req, res) =>{
    const data = req.body;
    postDb.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(404).json({message:"Could not update Post"})
    })
})

server.post('/user', (req, res) =>{
    const data = req.body;
    userDb.insert(data)
    .then(user =>{
        res.status(201).json(user)
    }).catch( err =>{
        res.status(404).json({message:"Could not update User"})
    })
})

server.put('/post/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.userId && data.text){
        postDb.update(id, data).then(count=>{
            if(count){
                postDb.findById(id).then(user=>{
                    res.json(user)
                })
            }else{
                res.status(404)
                .json({message:"failed to update"})
            }
        }).catch(err=>{
            res.status(500).json({message:"failed again"})
        })
    }else{
        res.status(400).json({message:"Missing a valid userId and text"})
    }
        // .then(update =>{
        //     res.json(update)
        // })
        // .catch(err=>{
        //     res.status(500).json({message:"Cannot do the .put"})
        // })
})

server.put('/user/:id', (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    userDb.update(id, data)
        .then(update =>{
            res.json(update)
        })
        .catch(err=>{
            res.status(500).json({message:"Cannot do the .put"})
        })
})

server.delete('/post/:id', (req, res) =>{
    const { id } = req.params;
    postDb.remove(id)
    .then(remove =>{
            if(remove){
                res.status(200).json({message:"It was deleted"})
            }else{
                res.status(500).json({message:"id does not exist"})
            }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed" })
    })

})

server.delete('/user/:id', (req, res) =>{
    const { id } = req.params;
    userDb.remove(id)
    .then(remove =>{
            if(remove){
                res.status(200).json({message:"It was deleted"})
            }else{
                res.status(500).json({message:"id does not exist"})
            }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed" })
    })

})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})