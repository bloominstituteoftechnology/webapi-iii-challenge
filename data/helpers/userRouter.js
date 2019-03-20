const userRouter = require('express').Router();

const db = require('./userDB.js');

const prepUsername = (req, res, next) => {
  req.body.name[0].toUpperCase();
  next();
}
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