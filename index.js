const express = require('express');
const dbUsers = require('./data/helpers/userDb.js')
const dbPosts = require('./data/helpers/postDb.js')
const server = express();

logger = (req, res, next) => {
    console.log(`${req.method} to ${req.url}`)
    next();
}

server.use(logger);
server.use(express.json());


server.get('/', (req, res) =>{
    res.send('running')
})

server.get('/users', (req, res) => {
    dbUsers.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The User information could not be retrieved."})
        });
});

server.post('/users', (req, res) => {
    const user = req.body;
    if(user.name){
        dbUsers.insert(user)
        .then(response =>
            dbUsers.get(response.id).then(user => {
                res.status(201).json(user);
        })
        )        
        .catch( err => {
            console.error('error', err);
            res.status(500).json({ error: "There was an error while saving the User to the Database."})
        })
    } else {
        res
            .status(400).json({ errorMessage: "Please provide title and contents for the post."});
    }
    
})



server.listen(5000, () =>     
    console.log(`server is listening on port 5000`));