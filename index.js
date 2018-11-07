const express = require('express');
const db = require('./data/helpers/userDb');

const app = express();

app.use(express.json());



app.listen(9000, () => console.log('\nThe Server is Alive on 9000!\n'));