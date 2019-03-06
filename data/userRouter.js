const express = require('express');
const userDb = require('./helpers/userDb.js');
const router = express.Router();

// POST
router.post('/', checkCase(), async (req, res) => {
	const { name } = req.body;
	try {
		if(name) {
			const user = await userDb.insert({ name });
			res
				.status(201)
				.json(user);
		}
		else {
			res
				.status(404)
				.json({ message: "Please insert name for user. "});
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "There was an error while saving user to the database." });
	}
});

// GET ALL
router.get('/', async (req, res) => {
	try {
		const users = await userDb.get();
		res.json(users);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The user information could not be retrieved." });
	}
});


// GET by ID
router.get('/:id', async (req, res) => {
	try {
		const users = await userDb.getById(req.params.id);
		if(users) {
			res.json(users);
		}
		else {
			res
				.status(404)
				.json({ message: "The user with that ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The user information could not be retrieved." });
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const users = await userDb.remove(req.params.id);
		if(users) {
			res.json(users);
		}
		else {
			res
				.status(404)
				.json({ message: "The user with specified ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The user could not be removed" });
	}
});

// PUT
router.put('/:id', checkCase(), async (req, res) => {
	const { id } = req.params.id;
	try {
		if (name && contents) {
			const user = await userDb.update({ name, contents });
			if(user) {
				res
					.status(200)
					.json(user);
			}
			else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		}
		else {
			res
				.status(400)
				.json({ message: "Please provide title and contents for the post." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The post information could not be modified." });
	}
});

// LIST OF POSTS FOR USER
router.get('/:id/post', async (req, res) => {
	try {
		const userPosts = await userDb.getUserPosts(req.params.id);
		if (userPosts) {
			res.json(userPosts);
		}
		else {
			res
				.status(400)
				.json({ message: "No posts for this user" });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "Posts could not be retrieved." });
	}
});

// DEFINING CUSTOM MIDDLEWARE - TO UPPERCASE
function checkCase (name) {
	return function (req, res, next) {
		if (!req.body.name) {
			res
				.status(418)
				.json({ message: "I'm a little teapot!" });
		}
		else {
			req.body.name = req.body.name.toUpperCase();
			next();
		}
	}
}

module.exports = router;















