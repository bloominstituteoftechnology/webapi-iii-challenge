const express = require('express');

const router = express.Router();
const userDb = require('../users/userDb')

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
console.log('get users')
userDb.get()
.then(response => {
    res.status(200).json(response)
})
.catch(error => {
        res.status(500).json({ message: 'error getting user'})

})

});

router.get('/:id', (req, res) => {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    console.log('get users id url'+req.url)
    console.log('get users id['+id+']')
if(parseInt(id) > 0)
{
userDb.getById(id)
   .then(response => {
 if(!response)
 res.status(400).json({ message: 'invalid user id'})

 console.log('then got to response',response)
       res.status(200).json(response)
   })
   .catch(error => {
           res.status(500).json({ message: 'error getting user'})

   })
}
else
{
if(req.url === '/users' || req.url === '/users/')
{
    userDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
            res.status(500).json({ message: 'error getting user'})
    
    })
}   
else
res.status(500).json({ message: 'error getting user'})
}

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware
  
function validateUserId(req,res, next) {
    const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/','')
    userDb.getById(id)
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
}

function validateUser(req, res, next) {
if(!req.body)
{
    res.status(400).json({ message: 'missing user data'})
}
else
if(!req.body.name)
{
    res.status(400).json({ message: 'missing required name field'})
}
next()
};

function validatePost(req, res, next) {
    if(!req.body)
    {
        res.status(400).json({ message: 'missing post data'})
    }
    else
    if(!req.body.text)
    {
        res.status(400).json({ message: 'missing required text field'})
    }
    next()
    };
    
module.exports = router;
