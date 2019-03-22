const express = require('express');


const server = express();
const parser = express.json();
const PORT = 3000;

server.use(parser);

function upperCase(req, res, next){
    let { name } = req.body;
    const upperCaseName = name.charAt(0).toUpperCase()+name.slice(1);
    req.body.name = upperCaseName;
    next();
}



server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})