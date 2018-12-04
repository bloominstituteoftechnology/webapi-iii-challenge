const express = require('express');

const server = express();
const PORT = 4000;

server.get('/userPosts', (req, res) =>{
    res.status(200).json({message:"Did this work"})
})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})