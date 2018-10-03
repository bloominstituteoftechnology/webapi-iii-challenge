const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const express = require('express');
const server = express();
server.use(express.json());
// const cors = require('cors');
// server.use(cors());

const port = 8000;
server.listen(port, ()=>{
    console.log(`API running on port ${port}`);
});

server.get('/', (req, res)=>{
    res.status(200).json('root sucessfully got');
});

server.get('/api/:dbtype', (req, res)=>{
    const {dbtype} = req.params;
    console.log(dbtype);
    switch (dbtype){
        case 'posts':
            postDb.get()
                .then(posts =>{
                    res.status(200).json(posts);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.get()
                .then(posts =>{
                    res.status(200).json(posts);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.get()
                .then(posts =>{
                    res.status(200).json(posts);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`${dbtype} not found`);
    }
});

