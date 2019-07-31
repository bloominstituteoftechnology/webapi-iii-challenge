const express = 'express';

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

module.exports = router;