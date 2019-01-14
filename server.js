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

server.post(`${url}:id`, async(req, res) => {
    const { name } = req.body;
    console.log(name)
    try{
        if(name.length > 128) {
            res.status(404).json(`{error: 'name must be under 128 characters'}`)
        } else {
            const post = await users.insert({name})
            res.status(201).json(post)
        }
    } catch(err) {
        res.status(500).json(`{error: 'there was an error while saving post to database'}`)
    }
});

server.put(`${url}:id`, async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { name } = req.body;
    try{
        const results = await users.update(id, data)
        if(!name) {
            res.status(404).json(`{error: 'please enter name for this user'}`)
        } else {
            res.status(200).json(results)
        }
    }catch(err){
        res.status(500).json(`{error: something went wrong}`);
    }
});

server.delete(`${url}:id`, async(req, res) => {
    const { id } = req.params;
    users.get(id);
    try{
        const userData = await users.remove(req.params.id)
        if(userData) {
            res.status(204).json(userData)
        } else {
            res.status(404).json(`{error: 'The user with this ID does not exist'}`)
        }
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = server