const express = require('express');
const router = express.Router();
const postDb = require('../data/helpers/postDb');



//===== POST Endpoints ======
//GET all posts [/api/posts]
router.get('/', (req, res) => {
    postDb.get()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({message: error})
    })

   });

    //GET posts by :id [/api/posts/:id]
  router.get('/:id', (req, res) => {
    const { id } = req.params;

    postDb.get(id) 
    .then(post => {
        console.log('GET post by id:', post)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: 'post Not Found'})
        }
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
})


  module.exports = router;
