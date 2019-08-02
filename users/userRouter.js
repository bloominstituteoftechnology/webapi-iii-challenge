const express =  require('express');

const router = express.Router();
const users = require('./userDb')

router.post('/', validatePost, validateUser, async (req, res) => {
    try {
      const post = await users.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
// router.post('/:id/posts', validatePost (req, res) => {
//     const post = await users.insert(req.params.id)


// });

router.get('/', async (req, res) => {
    try {
        const usersInfo  = await users.get();
        res.status(200).json(usersInfo);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the users',
        });
      }

});

router.get('/:id', validateUserId,  async(req, res) => {
    try {
        const user = await users.getById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }

});

router.get('/posts/:id', async(req,res)=> {
  try{const userPosts = await users.getUserPosts(req.params.id);
    res.status(200).json(userPosts);

  }catch (error){
    res.status(500).json({
      message: 'Error retreiving the user'
    })
  }
})

// router.get('/:id/posts', (req, res) => {
//     try{
//         const user =
//     }

// });

router.delete('/:id', async(req, res) => {
    try {
        const count = await users.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The user has been nuked' });
        } else {
          res.status(404).json({ message: 'The user could not be found' });
        }
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error removing the user',
        });
      }

});

router.put('/:id',  async (req, res) => {
    try{
        const user = await users.update(req.params.id, req.body);
        if(user){
            res.status(200).json(user);
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

//custom middleware


async function validateUserId(req,res, next){
    try {
      const{id} = req.params;
      const user = await users.getById(id);
  
      if(user){
        req.user = user;
        console.log(req.body)
        next();
      }else {
        res.status(404).json({message: 'id not found'})
      }
    }catch (error){
      res.status(500).json(error)
    }
  
  }

function validateUser(req, res, next) {
    const name = req.body.name;
    if(name){
        next();
     }else{
         res.status(400).json({message: "missing required name field."})
     }

};

function validatePost(req, res, next) {

  // const body  = req.body;
  // if(body){
  //   next();
  // }else{
  //   res.status(400).json({message: "missing body."})
  // }

    if (req.body && Object.keys(req.body).length > 0) {
        next();
      } else {
        res.status(400).json({message:'Pleaes include a body in your request.'});
      }
    }

module.exports = router;
