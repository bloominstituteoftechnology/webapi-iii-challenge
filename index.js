const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send('Hello')
});

server.listen(9000, () => console.log("Up and running"))
