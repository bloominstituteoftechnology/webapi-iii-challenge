const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 8000

//app.use(bodyParser());

const users = [

{
    "id": 0,
    "name": "Hop-Along"
},

{
        "id": 1,
     "name": "Jesse James"
},

{
"id": 2,
  "name": "Sundance"
},

{
     "id": 3,
   "name": "Doc Holliday"
}

];

let userId = 4;

server.get('/', (req, res) => {
   res.send('<h1>Hello!</h1>');
})

server.listen(8000);
