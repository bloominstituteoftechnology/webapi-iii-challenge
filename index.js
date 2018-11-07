//all required
const express = require('express');
const db = require('./data/helpers/userDb.js')

const server = express();
 
//inbuild middleware
server.use(express.json());

//get
server.get('/users', (request, response) => {
        db.get()
          .then(users => {
                response.status(200).json(users); 
           })
          .catch(error => {
                response.status(500).json({error : 'The users data could not be retrieved'})
           }) 
})

//post
server.post('/users', (request, response) => {
    if(request.body.name !== undefined) {
        db.insert(request.body)
          .then(userId => {
                response.status(201).json(userId);
           })
          .catch(error => {
                response.status(500).json({message : 'error creating user', error});
           }) 
    } else {
        response.status(400).json({ errorMessage: "Please provide name for the user." })
    }
}) 

//delete
server.delete('/users/:id', (request, response) => {
    db.remove(request.params.id)
      .then(count => {
            response.status(200).json(count);
       })
      .catch(error => {
            response.status(500).json({message : 'error deleting user'})
       })
})

server.listen(9000, () => {
     console.log("Server running on port 9000");
})