// yarn init -y
// yarn install
// yarn add express
// yarn add helmet
// npm i knex
// npm i sqlite3
// yarn add nodemon --dev

// import your node modules
const express = require('express');

// yarn add helmet -> npm i helmet
const helmet = require('helmet');

// add your server code starting here
const server = express();

// const db = require('./data/dbConfig.js');

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const tagRouter = require("./tags/tagRouter.js");

function thisUppercase(req, res, next) {
    console.log("In middleware: ", req.body);
    if (req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }
    next();
}

server.use(helmet());
server.use(express.json());
server.use(thisUppercase);

server.use("/api/users/", userRouter);
server.use("/api/posts/", postRouter);
server.use("/api/tags/", tagRouter);

server.get('/', (req, res) => {
    res.send('THIS TOOK FOREVER - AMANDA');
});

const port = 5000;
server.listen(port, () =>
    console.log('\n== Listening to Port 5000 ==\n'));