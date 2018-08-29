const express = require('express');
const db = {
  post: require('./data/helpers/postDb'),
  user: require('./data/helpers/userDb')
};
const app = express();

/* Middleware */
app.use(express.json());


/* DB requests */


app.listen(5000, () => console.log('Server listening on port 5000.'));
