const express = require('express');

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

// get all posts
server.get('/api/posts/', (req, res) => {
	postDB
		.get()
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => err.status(500).json({ message: "Can't retrieve post data!!" }));
});
// test success

// get all user posts
server.get(`/api/posts/user/`, (req, res) => {
	const userId = req.query.userId;
	userDB.getUserPosts(userId).then((user) => {
		user.length <= 0 ? res.status(404).json({ message: 'That user was not found' }) : res.status(200).json(user);
	});
});

// get post by id
server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	postDB.get(id).then((post) => {
		post.length <= 0 ? res.status(404).json({ message: 'That post was not found' }) : res.status(200).json(post);
	});
});
// test success

// create a post
server.post('/api/posts/', (req, res) => {
	postDB
		.insert(req.body)
		.then((postData) => {
			res.status(201).json(postData);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error creating post', err });
		});
});
//test success

// delete a post
server.delete('/api/posts/:id', (req, res) => {
	postDB.remove(req.params.id).then((count) => {
		count
			? res.status(200).json({ message: 'Post deleted successfully' })
			: res.status(404).json({ message: 'That post was not found or already deleted' });
	});
});
//test success

// update a post
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
