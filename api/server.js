const express=require('express');

const server=express();

const helmet=require('helmet');

const morgan=require('morgan');

const dbUsers = require('../data/helpers/userDb.js');

const dbPosts=require('../data/helpers/postDb.js')

function capitalizeNames(req, res, next) {
    req.body.name=req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  
    next();
  }

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(capitalizeNames);

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

server.post('/api/users', (req, res) => {
	const user = req.body;

	if (user.name) {
		dbUsers.insert(user)
			.then(userId => {
				dbUsers.getById(userId).then(newuser => {
					user = newpost;
				});
			})
			.then(res.status(201).json(user))
			.catch(err => {
				res.status(500).json({
					error: 'There was an error while saving the user to the database'
				});
			});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide a name!!!!'
		});
	}
});

//update user, 
server.put('/api/users/:id', (req, res) => {
	const updatedUser = req.body;
	let { id } = req.params;

	if (updatedUser.name) {
		//
		console.log('name' + id);
		console.log('updated user' + updatedUser.name);
		dbUsers.update(id, updatedUser).then(number => {
			console.log(number);
			if (!number) {
				res.status(404).json({
					error: 'The user with the specified ID does not exist'
				});
			} else {
					res.status(200).json({success:"user edited successfully"})
                    };
				
			
		});
    }})


//delete user

server.delete('/api/users/:id', (req, res) => {
	let { id } = req.params;

	dbUsers.get(id).then(user => {
		dbUsers.remove(id)
			.then(
				user
					? res.status(200).json({removed:`${user.name}`})
					: res.status(404).json({
							message: 'The user with the specified ID does not exist.'
					  })
			)
			.catch(res.status(500).json({ error: 'The user could not be removed' }));
        });
    });
    


//make and implement middleware so that every user is capitalized



//get all posts






//get individual post

//create post

//update post

//delete post