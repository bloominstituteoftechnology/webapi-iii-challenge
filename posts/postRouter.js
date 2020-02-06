const express = require('express');

const router = express.Router();
const postDb = require('../posts/postDb')

router.post('/', (req, res) => {
const post = req.body
postDb.insert(post)
.then(response =>{
    res.status(201).json(response)
})
.catch(error => {
    res.status(500).json({ message: 'error adding to posts'})
})

});
    
router.get('/', (req, res) => {
// console.log('get users')
postDb.get()
.then(response => {
    res.status(200).json(response)
})
.catch(error => {
        res.status(500).json({ message: 'error getting posts'})

})

});

router.get('/:id', (req, res) => {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    // console.log('get users id url'+req.url)
    // console.log('get users id['+id+']')
if(parseInt(id) > 0)
{
postDb.getById(id)
   .then(response => {
 if(!response)
 res.status(400).json({ message: 'invalid post id'})

 // console.log('then got to response',response)
       res.status(200).json(response)
   })
   .catch(error => {
           res.status(500).json({ message: 'error getting post'})

   })
}
else
{
if(req.url === '/posts' || req.url === '/posts/')
{
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
            res.status(500).json({ message: 'error getting post'})
    
    })
}   
else
res.status(500).json({ message: 'error getting post'})
}


});

router.delete('/:id', (req, res) => {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    postDb.getById(id)
    .then(response => {
       postDb.remove(id)
       .then(result => {
           // console.log('deleted title '+id)
         res.status(200).json(response);
       })
       .catch(error => {
           res.status(500).json({ message: 'error deleting post'})
       })
       })
   .catch(error => {
       res.status(500).json({ message: 'error deleting post'})
   })

});

router.put('/:id', (req, res) => {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    const post =  req.body;
    postDb.update(id, post)
    .then(response => {
       post.id = id
       res.status(200).json(post);
   })
   .catch(error => {
       res.status(500).json({ message: 'error updating post'})
   })

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    postDb.getById(id)
   .then(response => {
if (response)
  { 
    req.user = json(response).name
  }
else
{
    res.status(400).json({ message: 'invalid user id'})
}
})
   .catch(error => {
    res.status(400).json({ message: 'invalid user id'})
   })
next()
};

module.exports = router;