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
            res.status(500).json({error : 'Could not add new user'})
        })
    }else{
        res.status(404).json({error: 'Missing name for new user'})
    }
})

server.listen(PORT, () =>{
    console.log('Server is running')
});