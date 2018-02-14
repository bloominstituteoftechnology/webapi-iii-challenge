const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 8000

server.use(bodyParser.json());

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

/*server.get('/', (req, res) => {
   res.send('Hello!');
});*/

server.get('/users' , (req, res) => {
  res.status(200).send(users);
});

server.get('/users/:id', (req, res) => {
  if (users.length > 0) return res.send(users);
    res.send('No users')
});

server.get('/search' , (req, res) => {
  const name = req.query.name;
  const filter = users.filter(user => {
    user = user.name.tolowercase();
    return user.tolowercase();
  });
  res.send(filter);
});

server.delete('/users/:id', (req, res) => {
  users.splice(parseInt(req.params.id), 1);
  res.send('User Deleted')
});

server.post('/users', (req, res) => {
  const user = req.body.user;
  users = [...users, { name: user, id: id}];
  id++;
  res.send(users);
});

server.listen(PORT, err => {
  if (err){
      console.log(`You Dun Goofed!: ${err}`)
  } else {
      console.log(`Server listening on port ${PORT}`);
  }
});
