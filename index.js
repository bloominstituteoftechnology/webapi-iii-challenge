const express = require('express'),
    bodyParser = require('body-parser'),
    users = require('./users'),
    posts = require('./posts');

const app = express();

app
    .use(bodyParser.json())
    .use(function(req, res, next) {
        if (req.body.name) {
            req.body.name = req.body.name.toUpperCase()
        }

        next()
    })
    .use('/users', users)
    .use('/posts', posts);


app.listen(5000);