const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const users = require('./data/helpers/userDb.js');
const post = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

server.use(morgan('short'));
server.use(helmet());
server.use(cors());
server.use(express.json());


const url = '/api/users/';
const posturl = '/api/post/';
const tagsurl = '/api/tags/';

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
        res.status(500).json(`{error: 'user info could not be retrieved'}`)
    }
});

server.get(`${url}post/:userId`, async(req, res) => {
    const { userId } = req.params;
    console.log(userId)
    try{
        const userPost = await users.getUserPosts(userId)
        if(userPost.length === 0) {
            res.status(404).json(`{error: 'no post by that user has been found'}`)
        } else {
            res.status(200).json(userPost)
        }
    } catch(err) {
        res.status(500).json(`{error: 'user post could not be found' }`)
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

//Post routes

server.get(`${posturl}`, async(req, res) => {
    try{
        const postData = await post.get()
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(`{error: 'that route does not exist'}`)
    }
});

server.get(`${posturl}:id`, async(req, res) => {
    const { id } = req.params;
    try{
        const postData = await post.get(id)
        if(postData.lenght === 0) {
            res.status(404).json(`{error: 'That post was not found'}`)
        } else {
            res.status(200).json(postData)
        }
    }catch(err){
        res.status(500).json(`{error: 'post could not be retrieved'}`)
    }
});

server.post(`${posturl}`, async(req, res) => {

});

//Tags Route

server.get(tagsurl, async(req, res) => {
    try{
        const tagsData = await tags.get()
        res.status(200).json(tagsData)
    }catch(err){
        res.status(500).json(`{error: 'that url does not exist'}`)
    }
});

module.exports = server