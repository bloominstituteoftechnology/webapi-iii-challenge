const express = require('express');
const bodyParser = require('body-parser');

const server = express();     // create the server using express
const PORT = 3060;            // specify the port as a constant

server.use(bodyParser.json());   // tell the server to use bodyParser

const users = {};                // empty object to store users
let id = 0;                      // user id, starting at zero
const STATUS_USER_ERROR = 422;   // user err
const STATUS_SUCCESS = 200;      // success

server.get('/users', (req, res) => {
  if (id === 0) {                         // no users added yet, return the error
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'No users added, cannot display' });
    return;
  }

  res.status(STATUS_SUCCESS);             // users found
  res.send({ users });                    // send the users
  return;
});

server.get('/users/:id', (req, res) => {
  const findId = req.params.id;                      // saving the id in simpler form
  const foundName = Object.keys(users)[findId];      // finding the name by the id

  if (!foundName) {                                  // name not found, return error info
    res.status(STATUS_USER_ERROR);
    res.send({ error: `User with ID ${findId} not found`});
    return;
  }

  res.status(STATUS_SUCCESS);                        // user id found
  res.send({ foundName });                           // send the name
  return;
});

server.get('/search', (req, res) => {
  const searchName = req.query.name;                 // saving the name to find in simpler form
  let searchResults = [];                            // empty array to hold search results

  if (!searchName || searchName === '') {            // if no search name is provided, return error info
    res.status(STATUS_USER_ERROR);
    res.send({ error: `Search term not provided`});
    return;
  }

  searchResults = Object.keys(users).filter(user => {         // find all names that include searchName
    if (user.toLowerCase().includes(searchName.toLowerCase())) return user;      // ignore case
  });

  if (searchResults.length > 0) {     // if matches were found, send them back
    res.status(STATUS_SUCCESS);
    res.send({ searchResults });
    return;
  }
  res.status(STATUS_USER_ERROR);      // no matches were found, report the error
  res.send({ error: `No users with name ${searchName} found`});
  return;
});

server.post('/users', (req, res) => {    // post a new user to users data
  const name = req.body.name;            // save the name, in simpler form
  if (!name) {                           // if no name provided, report the error
    res.status(STATUS_USER_ERROR);
    res.send({ error: 'Name must be specified' });
    return;
  }
  
  users[name] = id;                      // assign next id to the user (previously incremented)
  res.status(STATUS_SUCCESS);            // report the successful addition
  res.send(id + '');
  id++;
  return;
});

server.delete('/users/:id', (req, res) => {           // delete a user from the users data
  const findId = req.params.id;                       // save the id to find, in simpler form
  const foundName = Object.keys(users)[findId];       // save the name matching that id

  if (!foundName) {                         // if name not found (no matching user), report error
    res.status(STATUS_USER_ERROR);
    res.send({ error: `User with ID ${findId} not found`});
    return;
  }
  
  delete users[foundName];                            // delete the user
  res.status(STATUS_SUCCESS);                         // report the successful deletion
  res.send({ success: `User with ID ${findId} (${foundName}) deleted` });
  return;
});

server.listen(PORT, error => {                                      // connect to server on specified PORT #
  if (error) console.log(`Error starting server on port ${PORT}`);  // server fails to start error msg
  else console.log(`Server listening on port ${PORT}`);             // server successfully starts message
});