const express = require("express");
const bodyParser = require("body-parser");
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const server = express();

const PORT = 3030; 

const users = {
    1: "Dixie",
    2: "Steven",
    3: "Edmund",
    4: "Michael"
};

server.get("/users", (req, res) => {
    res.status(STATUS_SUCCESS);
    res.send(users);
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.status(STATUS_SUCCESS);
    res.send(users[id]);
});

server.get("/search?name=<query>", (req, res) => {
    if (req.query.name) {
        let user = null;
        Object.keys(users).forEach((id => {
            if (users[id] === req.query.name) {
                user = id;
            };
        }));
        res.status(STATUS_SUCCESS);
        res.send(user);
    } else {
        res.status(STATUS_SUCCESS);
        res.send(users);
    }
});

// server.post("/users", (req, res) => {
//     const { user } = req.body;
//     res.status(STATUS_SUCCESS);
//     res.send();
// })

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error stating the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})
