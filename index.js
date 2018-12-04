const express = require('express');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const customMW = require('./custom_middleware');

const server = express();

const PORT = 5000;


server.use(express.json());
server.use(customMW.upperCase);

server.get('/api/users', (req, res)=>{
    userDB.get()
    .then(users=>{
        res.json(users);
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'});
    })
});

server.get('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    userDB.get(id)
    .then(user=>{
        if(user){
            res.json(user);
        }
        else{
            res.status(404).json({message: 'User not found.'})
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'});
    })
});

server.post('/api/users', (req, res)=>{
    const newUser = req.body
    if(newUser.name){
        userDB.insert(newUser)
        .then(idObj=>{
            userDB.get(idObj.id)
            .then(user=>{
                res.json(user);
            })
        })
        .catch(error=>{
            res.status(500).json({error: 'The information could not be retrieved.'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please provide a user name.'});
    }
});

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    userDB.get(id)
    .then(userToDelete=>{
        if(userToDelete){
            userDB.remove(id)
            .then(count=>{
                if(count){
                    res.json(userToDelete);
                }
                else{
                    res.status(500).json({error: 'The user could not be removed.'});
                }
            })
        }
        else{
            res.status(404).json({message: 'User not found.'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'The user could not be removed.'});
    })
});

server.put('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const user = req.body;
    if(user.name){
        userDB.update(id, user)
        .then(count=>{
            if(count){
                userDB.get(id)
                .then(user=>{
                    res.json(user);
                })
            }
            else{
                res.status(404).json({message: 'User could not be found'});
            }
        })
        .catch(error=>{
            res.status(500).json({error: 'The user could not be modified.'})
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please provide a user name.'});
    }
});

server.listen(PORT, err=>{
    console.log(`Server running on port: ${PORT}`);
});