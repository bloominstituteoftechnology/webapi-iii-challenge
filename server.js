const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const users = require('./data/helpers/userDb.js');

server.use(morgan('short'));
server.use(helmet());
server.use(cors());
server.use(express.json());

const url = '/api/users/'

server.get(url, async(req, res) => {
    try{
		const usersData = await users.get()
		res.status(200).json(usersData)
	}catch(err){
		res.status(500).json(`{ error: "The user information could not be retrieved." }`)
	}  
});

server.get(`${url}:id`, async(req, res) => {
    const { id } = req.params;

    // users.get(id)
    //     .then(userData => {
    //         res.status(200).json(userData)
    //     })
    //     .catch(err => {
    //         res.status(500)
    //     })
    try{
        const userData = await users.get(id)
        if(userData.length === 0) {
            res.status(404).json(`{'That id was not found'}`)
        } else {
            res.status(200).json(userData)
        }
    }catch(err){
        res.status(500).json(`{error: 'user infor could not ne retrieved'}`)
    }
});

module.exports = server