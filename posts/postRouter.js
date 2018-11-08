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

// //POST (create) new post [/api/posts/]
// router.post('/',  (req, res) => {
//     const post = req.body;
//     const { text } = post;
//     console.log('POST', post);
//      if (!name && !text) {
//       res.status(400).json({ message: "Name required" })
//     }
//      postDb.insert(post)
//       .then(newpost => {
//         res.status(201).json(newpost);
//       })
//       .catch(error => {
//         res.status(500).json({ message: error });
//       })
//   });

 //UPDATE post [/api/posts/:id]
 router.put('/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    postDb.update(id,post)
    .then (count => {
        if (count) {
            res.status(200).json({ message: `${count} post(s) updated`});
        } else {
            res.status(404).json({ message: 'post does not exist'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: error})
    })
})


//DELETE post [/api/posts/:id]
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb.remove(id)
    .then(count => {
        if (count) {
            res.status(200).json({ message: `${count} post(s) deleted`})
        } else {
            res.status(404).json({ message: 'post does not exist'})
        }
    })
    .catch (error => {
        res.status(500).json ({ message: error})
    })
})

  module.exports = router;
