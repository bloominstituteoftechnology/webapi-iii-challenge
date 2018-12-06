const express = require('express');
const helmet = require('helmet');
const logger= require('morgan');
const server = express();
const PORT = 5050;
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const upperCase = (req, res, next) =>{
    if(req.body.name){
        req.body.name = req.body.name.toUpperCase()
        next()
    }else{
        next()
    }
}

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use(upperCase());

server.get('/api/users', (req, res) =>{
    userDB.get()
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({error : 'Could not fetch user data'})
        })
})

server.get('api/users/:id', (req, res) =>{
    const {id} = req.params;
    userDB.getUserPosts(id)
      .then(user =>{
          res.status(200).json(user)
      })  
      .catch(err =>{
          res.status(500).json({error : 'Could not fetch user by that ID'})
      })
})

server.post('api/users', (req ,res) =>{
    const newUser = req.body
    if(newUser.name){
        userDB.insert(newUser)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err =>{
            res.status(404).json({error: 'Missing name for new user'})
            
        })
    }else{
        res.status(500).json({error : 'Could not add new user'})
    }
})

server.delete('api/users/:id', (req, res) =>{
    const {id} = req.params;
    let searchedUser;
    userDB.get(id)
        .then(user =>{
            searchedUser = user
        });
    userDB.remove(id)
        .then(count =>{
            if(count){
                res.status(200).json(searchedUser)
            }else{
                res.status(404).json({message : 'Could not find user with specified ID'})
            }
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not remove user'})
        })    
})

server.put('api/users/:id', (req, res) =>{
    const {id} = req.params;
    const user = req.body;
    if(user.name){
        userDB.update(id, user)
            .then(count =>{
                if(count){
                    userDB.get(id)
                        .then(user =>{
                            res.status(200).json(user)
                        })
                }else{
                    res.status(404).json({message : 'Could not find user with specified ID'})
                }
            })
            .catch(err =>{
                res.status(500).json({error : 'User could not be updated'})
            })
    }
})

//below is posts methods. Ask about how to break apart into seperate files

server.get('/api/posts', (req, res) =>{
    postDB.get()
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err =>{
            res.status(500).json({error : 'Trouble fetching posts'})
        })
})

server.get('/api/posts/:id', (req ,res) =>{
    const {id} = req.params;
    postDB.getPostTags(id)
        .then(post =>{
            res.status(200).json(post)
        })
        .catch(err =>{
            res.status(500).json({error : 'Could not get post with specified ID'})
        })
})

server.post('/api/posts', (req, res) =>{
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

server.delete('/api/posts/:id', (req, res) =>{
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

server.put('/api/posts/:id', (req ,res) =>{
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

server.listen(PORT, () =>{
    console.log('Server is running')
});