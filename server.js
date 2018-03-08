const express = require("express");
const bodyParser = require("body-parser");

const port = 3000

const server = express();
server.use(bodyParser.json())

const users = ["Kiwi", "MacGruber"];

server.get("/", (req, res) => {
    res.send("Come get ya users; hot fresh users here!");
})

server.get("/users", (req, res) => {
    res.send(users);
})

server.post("/users", (req, res) => {
    const user = req.body.user;
    users.push(user);
    res.send(users);
})

server.listen(port);
console.log(`The server is listening at port ${port}`);