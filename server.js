const express = require('express');
const cors = require('cors');
const app = express();

const users = require('./data/helpers/userDb.js')
const posts = require('./data/helpers/postDb.js')
const tags = require('./data/helpers/tagDb.js')

app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log('Server started at port 5000'));