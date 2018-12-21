const express=require('express');

const server=express();

const helmet=require('helmet');

const morgan=require('morgan');

const dbUsers = require('../data/helpers/userDb.js');

const dbPosts=require('../data/helpers/postDb.js')

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

module.exports=server;

//get all users

server.get('/api/users', (req, res) => {
    dbUsers.get()
    .then(users=>{
        res.status(200).json(users);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The users information could not be retrieved.' });
    });
})

//get individual user

server.get('/api/users/:id', (req, res)=>{
    const id=req.params.id;
    console.log("id"+id);
    dbUsers.get(id).then(user=>
        {
			if (user) {
				res.json(user);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
			res.status(200).json(user);
		}
        
        
        ).catch(
            err => {
                res
                    .status(500)
                    .json({ error: 'The user information could not be retrieved.' });
            }
        )}
)

//create user
//update user, 

//delete user




//get all posts


//make and implement middleware so that every user is capitalized



//get individual post

//create post

//update post

//delete post