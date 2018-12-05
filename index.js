const express = require('express'),
    bodyParser = require('body-parser'),
    users = require('./users'),
    posts = require('./posts');

const app = express();

app
    .use(bodyParser.json())
    .use('/users', users)
    .use('/posts', posts);


app.listen(5000);