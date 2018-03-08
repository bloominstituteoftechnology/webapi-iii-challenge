const express = require("express");
const bodyParser = require("body-parser");

const port = 3000
const USER_ERROR = 422;

const server = express();
server.use(bodyParser.json())

const users = ["Kiwi", "MacGruber"];

server.get("/", (req, res) => {
    res.send("Come get ya users; hot fresh users here!");
})

server.get("/users", (req, res) => {
    res.send(users);
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    if (users.indexOf(id) > -1){
        res.send(`${id}`)
    } else {
        res.status(USER_ERROR);
        res.send("User not found");
    }
})

server.get("/search", (req, res) => {
    const name = req.query.name;
    const result = [];
    
    if (!name){
        res.send("No match found");
        return;
    } else {
        users.forEach(person => {
            if (person.toLowerCase() === name.toLowerCase()){
                result.push(person);
            }
        })
        res.send(result);
    }
})

server.post("/users", (req, res) => {
    const user = req.body.user;
    users.push(user);
    res.send(users);
})

server.listen(port);
console.log(`The server is listening at port ${port}`);