const express = require("express");


const server = express();
server.use(express.json());



server.get('/', (requestAnimationFrame, res) => {
    res.send('<p>Hello</p>');
});







server.listen(8000, () => console.log("Yo, your API us running on port 8000"));