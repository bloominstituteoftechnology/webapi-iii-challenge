const express = require('express');
const router = express.Router();
const db = require('../data/helpers/postDb.js');


router.post('/', (req, res) => {
    const post = req.body; // what resource are you accessing here!

    db.insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({err: err})
    })

})

//http://foo.com?key=value&sort=asc this is query string
//req.query === { key: 'value', key: value}

router.post('/:id', (req, res) => {
    
})

router.get('/:id', (req, res) => {
    const id = req.params.id // grab the id from the URL Parameters

    db.findById(id).then(posts => {
        if(users.length === 0) {
            res.status(404).json({ message: 'user not found'});
        } else {
            res.json(posts[0]);
        }
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    
    db.update(id, update)
    .then(count => {
        if (count > 0) {
            db.findById(id).then(posts => {
                res.status(200).json(posts[0]);
            });
            res.status(200).json({msg: 'updated successfully'})
        } else {
            res.status(404).json({msg: "User not found"});
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})


router.delete('/:id', (req, res) => {
    const {id} = req.query;
    db.findById(id)
    .then(foundUser => {
        post ={...foundUser};
        db.remove(id)
    .then(response => {
        res.status(200).json(post);
        });
    })
    
    .catch(err => {
        res.status(500).json({err: err})
    })
})
module.exports = router;