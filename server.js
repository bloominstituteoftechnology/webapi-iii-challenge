const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3040

app.use(bodyParser());

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

