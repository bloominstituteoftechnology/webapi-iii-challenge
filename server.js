//create server
const express = require('express');
const server = express();
server.use(express.json());

//.get route handler
server.get('/', (req, res) =>{
    res.json("server up and running!")
});

//listener
const PORT = 4000;
server.listen(PORT, ()=>{
    console.log(`Server is up and listening on port ${PORT}`)
})