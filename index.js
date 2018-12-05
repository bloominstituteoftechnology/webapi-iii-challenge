const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb =  require ('./data/helpers/userDb.js')



const server = express();
server.use(express.json())
const PORT = 4000;

const gatekeeper = (req, res, next) =>{
    req.body.name.toUpperCase();
    next();
}

server.use(gatekeeper)

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
        if(posts){ //not sure why posts.length > 0 gives me the message in my else statement for all ids
            res.status(200).json(posts)
        }else{
            res.status(404).json({message:"The post with the specified id does not exist"})
        }
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
        if(user){//not sure why user.length > 0 gives me the message in my else statement for all ids
            res.status(200).json(user)
        }else{
            res.status(404).json({message:"The user with the specified id does not exist"})
        }
    }).catch(err => {
        res.status(500).json({message:"trouble getting user"})
    })
})

server.get('/user/:id/posts', (req, res)=>{
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(user =>{
            if(user.length > 0){
                res.status(201).json(user)
            }else{
                res.status(404).json({message:"The user with the specified id does not have any posts or does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"You messed up in the UserPosts"})
        })
})

server.post('/post', (req, res) =>{
    const data = req.body;
    if(!data.userId || !data.text){res.status(400).json({message:"Please provide a userId and text"})}
    postDb.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(404).json({message:"There was an error while saving the user to the database"})
    })
})

server.post('/user', gatekeeper, (req, res) =>{
    const data = req.body;
    if(!data.name){res.status(400).json({message:"Please provide a name"})}
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
                postDb.get(id).then(user=>{
                    res.json(user)
                }).catch(err=>{
                    res.status(500).json({message:"Could not return user!"})
                })
            }else{
                res.status(404)
                .json({message:"The post with the specified Id does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error with updating post in database"})
        })
    }else{
        res.status(400).json({message:"Missing a valid userId and text"})
    }
})

server.put('/user/:id', gatekeeper, (req, res)=>{
    const { id } = req.params;
    const data = req.body;
    if(data.name){
        userDb.update(id, data).then(count =>{
            if(count){
                userDb.get(id).then(user =>{
                    res.json(user)
                }).catch(err=>{
                    res.status(500).json({message:"Could not retrun the user"})
                })
            }else{
                res.status(404)
                .json({message:"The user with the specified id does not exist"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Error with updating user in database"})
        })

    }else{
        res.status(400).json({message:"Missing a valid name"})
    }
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