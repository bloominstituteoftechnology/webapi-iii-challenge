const express = require('express');
const upperCase = require('../middleware/actions');
const cors = require('cors');
const postDB = require('../data/helpers/postDb');
const userDB = require('../data/helpers/userDb');
const tagDB = require('../data/helpers/tagDb');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.json('alive');
});

////////////USER SECTION////////////////
// get all users
server.get('/api/user/', (req, res) => {
	const { id } = req.params;
	userDB
		.get(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(500).json({ message: "can't revieve user data!!" }));
});
// test success ex. localhost:9000/api/user/1 ==> "id": 1, "name": "Frodo Baggings"

server.get('/api/user/:id', (req, res) => {
	const { id } = req.params;
	userDB
		.get(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(500).json({ message: "can't revieve user data!!" }));
});

// get all user posts
server.get(`/api/user/:id`, (req, res) => {
	const userId = req.query.userId;
	userDB.getUserPosts(userId).then((user) => {
		user.length <= 0 ? res.status(404).json({ message: 'That user was not found' }) : res.status(200).json(user);
	});
});
// test success ex. localhost:9000/api/posts/user/?userId=1 ==> return of posts by Froto

// create a user and uppercase their name
server.post('/api/user', upperCase, (req, res) => {
	userDB
		.insert(req.body)
		.then((userData) => {
			res.status(201).json(userData);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error creating post', err });
		});
});
//test success

// update user by id and uppercase name
server.put('/api/user/:id', upperCase, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	userDB
		.update(id, changes)
		.then((user) => {
			user
				? res.status(200).json({ message: 'User updated successfully' })
				: res.status(404).json({ message: 'That user was not found' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error updating user', err });
		});
});
// test successful

// delete user by id
server.delete('/api/user/:id', (req, res) => {
	const { id } = req.params;
	userDB
		.remove(id)
		.then((user) => {
			user
				? res.status(200).json({ message: 'User successfully deleted' })
				: res.status(404).json({ message: 'user not found' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error, could not delete user', err });
		});
});
// test successful

//////////////POST SECTION///////////////

// get all posts
server.get('/api/posts/all', (req, res) => {
	postDB
		.get()
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => res.status(500).json({ message: "Can't retrieve post data!!" }));
	userDB;
});
// test success

// get post by id
server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	postDB.get(id).then((post) => {
		post.length <= 0 ? res.status(404).json({ message: 'That post was not found' }) : res.status(200).json(post);
	});
});
// test success

// delete a post by id
server.delete('/api/posts/:id', (req, res) => {
	postDB.remove(req.params.id).then((count) => {
		count
			? res.status(200).json({ message: 'Post deleted successfully' })
			: res.status(404).json({ message: 'That post was not found or already deleted' });
	});
});
//test success

// update a post by id
server.put('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	postDB
		.update(id, changes)
		.then((count) => {
			count
				? res.status(200).json({ message: 'Post updated successfully' })
				: res.status(404).json({ message: 'That post was not found' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error updating post', err });
		});
});
// test success

module.exports = server;
