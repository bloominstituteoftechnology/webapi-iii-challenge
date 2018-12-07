//server setup

const express = require('express');

const server = express();
const PORT = 4000;

//middleware

server.use(express.json());

//custom middleware

server.use((req, res, next) => {
    
})

//endpoints

server.get('', (req, res) => {
    res.json({ message: "request received" });
})



//listen

server.listen(PORT, err => {
    console.log(`listening on port ${PORT}`)
})