const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js')
const postDb = require('./data/helpers/postDb.js')


server.use(express.json());

function upperName(req, res,next) {
    req.body.name = req.body.name.toUpperCase();
    
    next();
}

server.get('/', (req,res) => {
    res.send('What is this madness?')
});

server.get('/users' , (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.error('error',err);
    })
});

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then((users) => {
        res.status(200).json(users);
    }).catch(err => {
        console.error('error',err);
    })
});


server.post('/users', upperName , (req, res) => {
    userDb.insert(req.body)
    .then((user) => {
      userDb.get(user.id)
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
});

server.delete('/users/:id', (req , res) => {
    const { id } = req.params; // const id = req.params.id;

    userDb.remove(id)
    .then(count => {
        console.log('count:', count);
        if (count) {
        res.status(204).end();
    } else {
        res.status(200).json({ message: 'No user with this id was found'});
    }
    })
    .catch(err => res.status(500).json(err));
});

server.put('/users/:id', upperName, (req , res) => {
    userDb.update(req.params.id, req.body).then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));  
   })
   






server.listen(2000, () => console.log('\n== API on port 2k ==\n'));