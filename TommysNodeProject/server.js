const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3333;
const STATUS = 200;


const users = {
    1: 'Tommy',
    2: 'Amanda',
    3: 'Nate',
    4: 'Jenniffer',
    5: 'Russell',

};

server.get('/', (req, res) =>{
    res.status(STATUS);
    res.send(users);
})

server.listen(PORT, (err) => {
    if (err) {
        console.log('There was an error: ', err);
    } else {
        console.log('Server listening on port: ', PORT)
    }
});