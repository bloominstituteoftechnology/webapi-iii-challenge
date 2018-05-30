const express = require('express');
const app = express();

const port = 5555;

app.get('/', (req, res) => {
    res.send('Hello there.')
})

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});