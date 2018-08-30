const express = require('express');
const app = express();

/* Middleware */
app.use('/api', require('./api'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

app.listen(5000, () => console.log('Server listening on port 5000.'));
