const express = require("express");

const router = express.Router();

const db =require('../data/helper/userDb')

router.get('/',(req,res)=>{
    db
    .get()
    .then(users =>{
        res.json(users)
    })
    .catch(error=>{
        res.status(500).json({error: "darn this error"})
    })
})

router.get('/:id', (req,res) =>{
    const { id } = req.params

    db
    .get(id)
    .then(user=>{
    res.json(user)
})
.catch(error =>{
    res.status(500).json({error: "darn this error"})
})

})