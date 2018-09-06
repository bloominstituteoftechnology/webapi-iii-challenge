const express = require('express');
const userDb = require('../data/helpers/userDb.js')
const router = express.Router();

// middleware

function upperName(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    
    next();
}

// users

router.get('/' , (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.error('error',err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
    userDb.get(req.params.id)
    .then((users) => {
        res.status(200).json(users);
    }).catch(err => {
        console.error('error',err);
    })
});


router.post('/', upperName , (req, res) => {
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

router.delete('/:id', (req , res) => {
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

router.put('/:id', upperName, (req , res) => {
    userDb.update(req.params.id, req.body).then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ message: 'update failed'}));  
   })

   module.exports = router;

