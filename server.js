const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const PORT = 3030;
let users = [];
let id = 0;

app.use(bodyparser.json());


app.post('/users', (req, res) => {
    if (req.body.user) {
      users.push({id: id, name: req.body.user });
    res.send(id + '');
    id ++;  
    } else {
        res.send('Error: Must provide user information in the body');
    }    
});

app.get('/users', (req, res) => {
    if (users.length > 0) res.send(users);
    res.send('There are no users');
});


app.get('/users/:id', (req, res) => {
    if (req.params.id) {
       const filter = users.filter(user => user.id === Number(req.params.id));
       res.send(filter); 
    } else {
        res.send('Error: Must provide search id parameter');
    }
});


app.get('/search', (req, res) => {
    if (req.query.name) {
      const query = req.query.name.toLowerCase();
      const search = users.filter(user => user.name.toLowerCase().includes(query));
      res.send(search);  
    } else {
        res.send('Error: Must provide a search query')
    }
    
});

app.delete('/users/:id', (req, res) => {
    if (req.params.id) {
      const del = users.filter(user => user.id !== Number(req.params.id));
      users = del;
      res.send(users);  
    } else {
        res.send('Error: ID does not exist')
    }
    
});

app.listen(PORT, err => {
    if(err) {
        console.log(`There was an error starting the server: ${err}`)
    } else {
        console.log(`App listening on port: ${PORT}`);
    }
});