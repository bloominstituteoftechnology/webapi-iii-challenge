const express = require('express');
const postDb = require('./helpers/postDb.js');
const router = express.Router();

// POST
router.post('/', async (req, res) => {
	/*const {  } = req.body;
	try {
		if(title && contents) {
			const post = await postDb.insert({ title, contents, id });
			res
				.status(201)
				.json(post);
		}
		else {
			res
				.status(404)
				.json({ message: "Please provide title and contents for the post." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "There was an error while saving the post to the database" });
	}*/
});

// GET ALL
router.get('/', async (req, res) => {
	try {
		const posts = await postDb.get();
		res.json(posts);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The posts information could not be retrieved." });
	}
});


// GET by ID
router.get('/:id', async (req, res) => {
	try {
		const posts = await postDb.getById(req.params.id);
		if(posts) {
			res.json(posts);
		}
		else {
			res
				.status(404)
				.json({ message: "The post with that ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The post information could not be retrieved." });
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const users = await postDb.remove(req.params.id);
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
router.put('/:id', async (req, res) => {
	/*const { id } = req.params.id;
	try {
		if (name && contents) {
			const user = await postDb.update({ name, contents });
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
	}*/
});

module.exports = router;