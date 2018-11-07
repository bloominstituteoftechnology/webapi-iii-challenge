//all required
const express = require('express');
const db = require('./data/helpers/userDb.js')

const server = express();
 
//inbuild middleware
server.use(express.json());

server.get('/users', (request, response) => {
        console.log(request.body);
        db.get()
          .then(users => {
                response.status(200).json(users); 
           })
})


server.listen(9000, () => {
     console.log("Server running on port 9000");
})