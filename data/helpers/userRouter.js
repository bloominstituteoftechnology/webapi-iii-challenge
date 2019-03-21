const userRouter = require('express').Router();

const db = require('./userDB.js');

const prepUsername = (req, res, next) => {
  req.body.name[0].toUpperCase();
  next();
}

userRouter.get('/', async (req,res) => {
    try{
        const users = await db.get();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message: err});
    }
})
userRouter.get('/:id', async (req, res) => {
    try{
        const user = await db.getById(id);
        user
            ? res.status(200).json(user)
            : res.status(404).json({message: "That user doesn't exist"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to communicate with server"})
    }
})
userRouter.delete('/:id', async (req, res) => {
    try{
        const user = await db.remove(req.params.id);
        user
            ? res.status(200).json(user)
            : res.status(404).json ({message: "User not found"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Failed to communicate with server due to${err}`})
    }
})
userRouter.post('/:id', prepUsername, (req, res) => {
    db.getById(req.params.id)
        .then(()=>{})
        .catch(()=>{})
})
userRouter.put('/:id', prepUsername, (req, res) => {
    db.getById(req.params.id)
        .then(()=>{})
        .catch(()=>{})
})

module.exports = userRouter;