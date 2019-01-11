const express = require('express');
const configureMiddleware = require('./config/middleware.js');

// import DB helpers
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

// apply middleware
configureMiddleware(server);

// uppercase first letter of name
function upperCase(name) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}

// fetch users
server.get('/api/users', async ({ res }) => {
	try {
		const users = await userDb.get();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while retrieving users.',
			error: err,
		});
	}
});

// fetch user by ID
server.get('/api/users/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const user = await userDb.get(id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				message: 'User not found.',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while retrieving the user.',
			error: err,
		});
	}
});

// add new user
server.post('/api/users', async (req, res) => {
	const { body } = req;

	if (!body.name || body.name.length > 128) {
		res.status(400).json({
			message: 'Invalid username',
		});
	} else {
		body.name = upperCase(body.name);
	}

	try {
		const { id } = await userDb.insert(body);
		const user = await userDb.get(id);
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while creating new user.',
			error: err,
		});
	}
});

// delete user by ID
server.delete('/api/users/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const removedUser = await userDb.get(id);
		const removedCount = await userDb.remove(id);
		if (removedCount === 1) {
			res.status(200).json(removedUser);
		} else {
			res.status(404).json({
				message: 'User not found.',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while deleting this user.',
			error: err,
		});
	}
});

// update user
server.put('/api/users/:id', async (req, res) => {
	const { id } = req.params;
	const name = req.body;

	if (!name || name.length > 128) {
		res.status(400).json({
			message: 'Invalid username',
		});
	} else {
		name.name = upperCase(name.name);
	}

	try {
		const editedCount = await userDb.update(id, name);
		if (editedCount === 1) {
			const editedUser = await userDb.get(id);
			res.status(200).json(editedUser);
		} else {
			res.status(404).json({
				message: 'User not found.',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error updating this user.',
			error: err,
		});
	}
});

// fetch user posts by user ID
server.get('/api/user/:id/posts', async (req, res) => {
	const { id } = req.params;

	try {
		const posts = await userDb.getUserPosts(id);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
	}
});

// fetch all posts
server.get('/api/posts', async (req, res) => {
	try {
		const posts = await postDb.get();
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({
			message: 'There was an error retrieving the posts.',
			error: err,
		});
	}
});

// fetch post by post ID
server.get('/api/posts/:id', async (req, res) => {
	const { id } = req.params;

	try {
        const post = await postDb.get(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Sorry, the post with this ID could not be found.',
            });
        }
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while retrieving your post.',
			error: err,
		});
	}
});

// create new post
server.post('/api/posts', async (req, res) => {
	try {
		console.log(req.body);
		const newPostCount = await postDb.insert(req.body);
		if (newPostCount === 1) {
			res.status(201).json(newPostCount);
		} else {
			res.status(404).json({
				message: "Sorry, we couldn't find that user.",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error creating this post.',
			error: err,
		});
	}
});

// edit post
server.put('/api/posts/:id', async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const editedCount = await postDb.update(id, body);
		if (editedCount === 1) {
			res.status(201).json(editedCount);
		} else {
			res.status(404).json({
				message: "Sorry, we couldn't find this post.",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while updating this post.',
			error: err,
		});
	}
});

// delete post by post ID
server.delete('/api/posts/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedCount = await postDb.remove(id);
		if (deletedCount === 1) {
			res.status(201).json(deletedCount);
		} else {
			res.status(404).json({
				message: 'The post with the specified ID could not be found.',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error deleting this post.',
			error: err,
		});
	}
});

module.exports = server;
