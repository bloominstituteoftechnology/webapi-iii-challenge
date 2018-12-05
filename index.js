
const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const postDB = require('./data/helpers/postDb.js');
const helmet = require('helmet');

const server = express();
const parser = express.json();
const PORT = "4000";

server.use(parser);
server.user(helmet());

server.get('/api/users', (req, res) =>  {
    userDB.get()
        .then((users)   =>  {
            res
            .send(users)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The user list could not be retrieved." });
        });
})

server.listen(PORT, () =>  {
    console.log("server started. Kind of..");
})
