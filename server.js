const express = require("express");
const cors = require('cors');
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");
const userDb = require("./data/helpers/userDb");

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({origin: "http://localhost:3000"}));

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}

server.get('/api/users', (req, res)=>{
    userDb
        .get()
        .then(users=>{
            if(users.length===0){
                sendUserError(404, "Users could not be found", res);
                return;
            } else{
            res.status(200).json({ users });
            }
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving users information");
            return;
        });
});

server.get('/api/posts', (req, res) =>{
    postDb
        .get()
        .then(posts=>{
            if(posts.length===0){
                sendUserError(404, "Posts could not be found", res);
                return;
            } else{
            res.status(200).json({ posts })
            }
        })
        .catch(err =>{
            sendUserError(500, "Post information could not be retrieved", res)
            return;
        });
})

server.get('/api/tags', (req, res) =>{
    tagDb
        .get()
        .then(tags =>{
            if(tags.length===0){
                sendUserError(404, "Posts could not be found", res);
            } else{
            res.status(200).json({tags})
            }
        })
        .catch(err =>{
            sendUserError(500, "Tag information could not be retrieved", res);
            return;
        });
})

server.post('/api/users', (req, res) =>{
    const { name } = req.body;
    if(!name){
        sendUserError(400, "Must include name", res)
        return;
    }
    userDb
        .insert({ name })
        .then(res =>{
           console.log(res.status(201).json(res));
        })
        .catch(err =>{
            sendUserError(500, "User could not be saved", res)
            return;
        });
})

server.post('/api/posts', (req, res) =>{
    const { text } = req.body;
        if(!text){
            sendUserError(400, "Must include text", res);
            return;
        }
    postDb
        .insert({ text }) 
        .then(res => {
            res.status(201).json(res);
        })
        .catch(err =>{
            sendUserError(500, "Post could not be saved", res);
            return;
        });
})

server.post('/api/tags', (req, res) =>{
    const { tag } = req.body;
        if(!tag){
            return sendUserError(400, "Must include tag", res);
        }
    tagDb
        .insert({ tag }) 
        .then(res => {
            res.json(res);
        })
        .catch(err =>{
            return sendUserError(500, "Tag could not be saved", res);
        });
})

server.get('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    
    userDb
        .get(id)
        .then(user =>{
            if(!user){
                return sendUserError(404, "user could not be found", res);
            }
            res.json({user: user});
        })
        .catch(err =>{
            sendUserError(500, "The requested ID could not be retrieved", res)
        });
})

server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    
    postDb
        .get(id)
        .then(post =>{
            console.log("post", post);
            if(!post){
                sendUserError(404, "post could not be found", res);
                return;
            }
            res.json(post);
        })
        .catch(err =>{
            sendUserError(500, "The requested post ID could not be retrieved", res)
        });
})

server.get('/api/tags/:id', (req, res) =>{
    const { id } = req.params;
    
    tagDb
        .get(id)
        .then(tag =>{
            console.log("tag", tag);
            if(!tag){
                sendUserError(404, "tag could not be found", res);
                return;
            }
            res.json(tag)
            })
        .catch(err =>{
            sendUserError(500, "The requested tag ID could not be retrieved", res)
        });
})

server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    userDb
        .remove(id)
            .then(res =>{
                res.status(204).json({Success:"This user was successfully deleted"});
            })
            .catch(err =>{
                sendUserError(500, "There was an error in deleting this user", res)
                return;
            });

})

server.delete('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    postDb
        .remove(id)
            .then(res =>{
                res.status(204).json({Success:"This post was successfully deleted"});
            })
            .catch(err =>{
                sendUserError(500, "There was an error in deleting this post", res)
                return;
            });

})

server.delete('/api/tags/:id', (req, res) =>{
    const { id } = req.params;
    tagDb
        .remove(id)
            .then(res =>{
                res.status(204).json({Success:"This tag was successfully deleted"});
            })
            .catch(err =>{
                sendUserError(500, "There was an error in deleting this tag", res)
                return;
            });

})

server.listen(port, () =>{ console.log(`Server is listening on ${port}`)});