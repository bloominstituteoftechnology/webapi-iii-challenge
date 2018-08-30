const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

const errorHandler = (res, code, msg) => {
    res.status(code).json({message: msg});
}

const nameCheckNLimit = (req, res, next) => {
    let { name } = req.body;
    if(name){
        if(name.length < 128 && name.length > 0){
            next();
        } 
        this.errorHandler(404, 'No name, no game...whatever that means.;')
    }
};

app.get('/', (req, res) => {
    res.send('Whuddup.');
});

app.get('/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json({message: users})
        })
        .catch( err => {
            console.log('Error', err)
            res.status(500).json({message: 'Unable to grab users.'})
        });
});

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    
    let {id} = req.params;
    userDb.getUserPosts(id)
        .then(user => {
            res.status(200).json({ message: user })
        })
        .catch(err => {
            console.log('Error', err)
            res.status(500).json({ message: 'Unable to grab user posts.' })
        });
});

app.post('/users', (req, res) => {
    let { name } = req.body;
    this.nameCheckNLimit(name);
    userDb.insert(name)
        .then((res) => {
            res.status(201).json({message: 'User created.'})
        })
        .catch((err)=>{
            res.status(500).json(err);
        });
})

app.put('/users/:id', (req, res)=>{
    let { id } = req.params;
    userDb.update(id, req.body)
        .then(user => {
            res.status(200).json({user})
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

app.listen(9000, () => console.log("Listening on 9000"));