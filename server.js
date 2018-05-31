// express
// cors
const express = require("express");
const cors = require("cors");

// database helpers
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

// server code
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: "http://localhost:3001" }));

const sendError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
};

const customLogger = (req, res, next) => {
    const ua = req.headers["user-agent"];
    const { path } = req;
    const timeStamp = Date.now();
    const log = { path, ua, timeStamp };
    const stringLog = JSON.stringify(log);
    console.log(stringLog);
    next();
};

server.use(customLogger);

server.get("/", (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send("Hello from express");
});

// server.get('/api/users');
server.post("/api/users", (req, res) => {
    const { name } = req.body;
    if (name.length < 1 || name.length > 128) {
        sendError(400, "Please provide a name that is between 1 and 128 characters long.", res);
        return;
    }
    users
        .insert(name)
        .then(response => {
            users.findById(response.id).then(user => {
                res.status(201).json({ user });
            });
        })
        .catch(error => {
            sendError(
                500,
                "There was an error while saving the user to the database.",
                res
            );
            return;
        });
});

// server.get('/api/posts');
// server.get('/api/tags');



server.listen(port, () => console.log(`Server is running on port ${port}`));