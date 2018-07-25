const express = require('express');
const userDb =  require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.json());

server.get('/users', async (req, res)=> {
try {
    const users = await userDb.get();
    res.status(200).json(users);
} catch(err) {
    res.status(500).json({ message: 'Users could not be retrieved.'})
}
})

server.get('/users/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const user = await userDb.get(id)
        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json({ message: 'User could not be retrieved.'})
    }
})

server.post('/users/', async (req, res) => {
    let user = req.body;
    if(!('name') in user){
        res.status(400).send({errorMessage: "Please provide a name for the user."});
    }
    
    try {
        const newUserId = await userDb.insert(user)
        res.status(200).json(newUserId);
    }
    catch(err) {
        res.status(500).json({ message: 'User could not be created.'})
    }

})
server.listen(8000, () => console.log('API running on port 8000'));