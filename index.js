
const express = require("express");
const helmet = require("helmet");
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(`Origin`) || 'Node Lab'}`
    )
    next();
}

function auth(req, res, next) {
    if (req.url === '/posts') {
        next();
    } else {
        res.send('You shall not pass!');
    }
}

server.use(express.json());
server.use(logger);
server.use(helmet());

server.get('/posts', auth, async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Failed posts get' })
    }
})
server.get('/posts/users', async (req, res) => {
    try {
        const posts = await userDb.get();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Failed users get' })
    }
})
server.get('/posts/tags', async (req, res) => {
    try {
        const posts = await tagDb.get();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Failed tags get' })
    }
})

server.listen(8000, () => console.log('API running on port 8000... *.*'));