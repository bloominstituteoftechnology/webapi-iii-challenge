const express = require ('express');

const router = express.Router();
const posts = require('./postDb')

router.get('/', async (req, res) => {
  try{
     const postInfo = await posts.get(req.body.text);
     res.status(200).json(postInfo)

  }catch (error){
    res.status(500).json({
      message: 'Error retrieving the posts'
    })
  }

});

router.get('/:id')

router.get('/:id', async (req, res) => {
   try{
     const post = await posts.getById(req.params.id)
     if(post){
       res.status(200).json(post)
     }else{
       res.status(404).json({
         message: 'The post you are looking for cannot be found'
       })
     }
   } catch (error){
     console.log(error)
     res.status(500).json({
       message: 'Could not retrieve the post.'
     })
   }
});

router.post('/', async(req, res) => {
  try{
    const post = await posts.insert(req.body);
    res.status(201).json(post);
  }catch (error){
    res.status(500).json({
      message: 'Error adding the post'
    })
  }
})

router.delete('/:id',  async (req, res) => {
  try {
    const count =  await posts.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({
        message: 'This post has been deleted ☠'
      })
    } else {
      rex.status(404).json({
        message: 'The post you are looking for could not be found '
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not delete the post '
    })
  }
});

router.put('/:id', validatePost, async (req, res) => {
  try{
    const post = await posts.update(req.params.id, req.body);
    if(post){
        res.status(200).json(post);
    }else{
        res.status(404).json({message: 'the user could not be found'
    })
    }
}catch (error){
    console.log(error);
    res.status(500).json({
        message: 'error updating the user.'
    })
}

});

// custom middleware

async function validateUserId(req,res, next){
    try {
      const{id} = req.params;
      const user = await users.findById(id);
  
      if(user){
        req.user = user;
        next();
      }else {
        res.status(404).json({message: 'id not found'})
      }
    }catch (error){
      res.status(500).json(error)
    }
  
  }
function validatePostId(req, res, next) {

};
function validatePost(req, res, next) {

  const body  = req.body;
  // if(body){
  //   next();
  // }else{
  //   res.status(400).json({message: "missing body."})
  // }}

    if (req.body && Object.keys(req.body).length > 0) {
        next();
      } else {
        res.status(400).json({message:'Please include a body in your request.'});
      }
    }

module.exports = router;