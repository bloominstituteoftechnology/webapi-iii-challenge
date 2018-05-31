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

const logger = (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const host = req.headers.host;

    if (!userEngagement[`${req.socket.remoteAddress}`]) {
        userEngagement[`${req.socket.remoteAddress}`] = { times: 0, last: Date.now() };
    }
    userEngagement[`${req.socket.remoteAddress}`].times += 1;
    userEngagement[`${req.socket.remoteAddress}`].last = Date.now();
    console.log('engagement: ', userEngagement);
    if (userEngagement[`${req.socket.remoteAddress}`].times > 5 && (userEngagement[`${req.socket.remoteAddress}`].last - (Date.now() - 5000)) < 5000) {
        setTimeout(() => {
            userEngagement[`${req.socket.remoteAddress}`] = 0;
            userEngagement[`${req.socket.remoteAddress}`].last = Date.now();
        }, 5000);
        res.send({ error: 'Too many Requests!' });
    } else {
        console.log('##----------------------##', '\nRequest Time: ', Date.now(), '\nRequest:', req.socket.remoteAddress, '\nUserAgent: ', userAgent, '\nHost: ', host, '\nUrl:', req.url, '\n##----------------------##');
        next();
    }
}

server.use(logger);

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