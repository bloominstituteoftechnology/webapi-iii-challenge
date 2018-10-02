const express = require('express');
const port = 5555;
const server = express();

const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');


server.use(express.json());
const cors = require('cors')
server.use(cors())


//make sure server is working
server.get('/', (req, res) => {
	res.send('hello from express');
})

//gets the user list
server.get('/api/users', (req, res) => {
	users
	.get()
	.then(users => {
		res.status(200).json(users)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: "the users information could not be recieved"})
	})
})

//makes first letter in name capital
const middleUP = (req, res, next) => {
	const {name} = req.body;
	req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next()
}

//gets a specific user
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id
	users
	.get(id)
	.then(user => {
		if (!user){
			res.status(404).json({ msg: "The user with the specified ID does not exist." })
		} else {
			res.status(200).json({user})
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "The user information could not be retrieved." })
	})
})

//gets all posts by specific user
server.get('/api/users/:id/posts', (req, res) => {
	const id = req.params.id
	users
	.getUserPosts(id)
	.then(userPosts => {
		if (userPosts.length === 0){
			res.status(404).json({msg: 'No posts at ID location'})
		} else {
			res.status(200).json({userPosts})
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "Error recieved when accessing users posts" })
	})
})

//makes a new user
server.post('/api/users', middleUP, (req, res) => {
	if (!req.body.name){
		res.status(400).json({msg: 'please provide name'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name' })
	} else {
		users
		.insert(req.body)
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "there was an error while saving user"})
		})
	}
})

server.put('/api/users/:id', middleUP, (req, res) => {
	const id = req.params.id
	if (!req.body.name){
		res.status(400).json({msg: 'please provide name'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name'})
	} else {
		users
		.update(id, req.body)
		.then(response => {
			if (response === 0){
				res.status(404).json({ msg: "The user with the specified ID does not exist." })
			}
			if (response === 1){
				res.status(200).json(response)
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while updating user'})
		})
	}
})

//delete a user
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	users
	.remove(id)
	.then(response => {
		if (response === 0){
			res.status(404).json({msg: 'The user with the specificed ID does not exist'})
		}
		if (response === 1){
			res.status(200).json({response})
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting user'})
	})
})

//user will create a new post to specific user
server.post('/api/users/:id/posts/', (req, res) => {
	const userId = parseInt(req.params.id)
	const {text} = req.body;

	if (!req.body.text) {
		res.status(400).json({msg: "Please provide content for post"})
	} else {
		posts
		.insert({userId, text})
		.then(response => {
			res.status(201).json(response);
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "There was an error while saving the post" })
		})
	}
})

server.put('/api/posts/:id', (req, res) => {
	//console.log(req.params)
	const id = req.params.id
	const {text} = req.body

	if (!req.body.text){
		res.status(400).json({msg: "Please provide content for editing post"})
	} else {
		posts
		.update(id, {text})
		.then(response => {
			if (response === 0){
				res.status(404).json({msg: 'The post with the specified Id does not exist'})
			}
			if (response === 1){
				res.status(200).json({response})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while deleting user'})
		})
	}
})

server.listen(port, () => console.log(`server running on port ${port}`));




