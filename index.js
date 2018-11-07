const express = require('express');
const db = require('./data/dbConfig.js')

const app = express();

app.use(express.json());





const port = 9000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});