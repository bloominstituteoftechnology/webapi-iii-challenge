const express = require('express');
const server = express();
const port = 9000;
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

server.use(cors());
server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());

const upperCase = (req, res, next) => {
    req.name = req.body.name.toUpperCase();
    console.log(req.name);
    next();
};

server.get('/', (req, res) => {
	res.send('<h2>Server is running.</h2>');
})

//// GETS USER LIST ////
server.get('/api/users', (req, res) => {
	userDb
	.get()
	.then(users => {
		res.status(200).json(users)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: "the users information could not be recieved"})
	})
})

//// FIRST LETTER CAPITAL ////
const middleUP = (req, res, next) => {
	const {name} = req.body;
	req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next()
}

//// GETS SPECIFIC USER ////
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id
	userDb
	.get(id)
	.then(user => {
		if (!user){
			res.status(404).json({ msg: "The user with the specified ID does not exist." })
		} else {
			res.status(200).json(user)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "The user information could not be retrieved." })
	})
})

//// GETS ALL POSTS BY SPECIFIC USER ////
server.get('/api/users/:id/posts', (req, res) => {
	const id = req.params.id
	userDb
	.getUserPosts(id)
	.then(userPosts => {
		if (userPosts.length === 0){
			res.status(404).json({msg: 'No posts at ID location'})
		} else {
			res.status(200).json(userPosts)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "Error recieved when accessing users posts" })
	})
})

//// CREATES NEW USER ////
server.post('/api/users', middleUP, (req, res) => {
	if (!req.body.name){
		res.status(400).json({msg: 'please provide name'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name' })
	} else {
		userDb
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
		userDb
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

//// DELETES A USER ////
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	userDb
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

//// USER CREATES NEW POST FOR SPECIFIC USER ////
server.post('/api/users/:id/posts/', (req, res) => {
	const userId = parseInt(req.params.id)
	const {text} = req.body;

	if (!req.body.text) {
		res.status(400).json({msg: "Please provide content for post"})
	} else {
		postDb
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


server.get('/api/posts', (req, res) => {
	postDb
	.get()
	.then(posts => {
		res.status(200).json(posts)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ error: "The posts information could not be retrieved." })
	});
})

server.get('/api/posts/:id', (req, res) => {
	const id = req.params.id
	postDb
	.get(id)
	.then(posts => {
		if (!posts[0]){
			res.status(404).json({ message: "The post with the specified ID does not exist." })
		} else {
			res.status(200).json(post)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ error: "The post information could not be retrieved." })
	})
})

server.put('/api/posts/:id', (req, res) => {
	const id = req.params.id
	const {text} = req.body

	if (!req.body.text){
		res.status(400).json({msg: "Please provide content for editing post"})
	} else {
		postDb
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

server.delete('/api/post/:id', (req, res) => {
	const id = req.params.id
	postDb
	.remove(id)
	.then(response => {
		if (response === 0){
			res.status(404).json({msg: 'The post with ID does not exist'})
		}
		if (response === 1){
			res.status(200).json(response)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting user'})
	})
})

server.listen(port, () => console.log(`server running on port ${port}`));