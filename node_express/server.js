const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

const users = {
    1: 'Shobana',
    2: 'Tiffany',
    3: 'Ivan'
};

server.listen(PORT, (err) => {
    if(err) {
        console.log(`There was an error ${err}`);
    } else {
        console.log(`Server is listening on PORT number ${PORT}`)
    }
});