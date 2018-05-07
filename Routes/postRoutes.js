const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');

router.get('/', (req, res) => {
	db
		.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db
		.get(id)
		.then(post => {
			res.status(200).json(post)
		})
		.catch(err => {
			res.status(404).json({ message: "A post with that specific ID does not exist." });
		});
});

router.post('/', (req, res) => {
	const postInfo = req.body;

	db
		.insert(postInfo)
		.then(response => {
			db
				.get(response.id)
				.then(post => {
					res.status(201).json(post);
				})
				.catch(err => {
					res.status(404).json({ message: "A post with that specific ID does not exist." });
				});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const update = req.body;

	db
		.update(id, update)
		.then(response => {
			db
				.get(id)
				.then(post => {
					res.status(200).json(post);
				})
				.catch(err => {
					res.status(404).json({ message: "A post with that specific ID does not exist." });
				});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	let post;

	db
		.get(id)
		.then(foundPost => {
			post = foundPost;
			db
				.remove(id)
				.then(response => {
					res.status(200).json(post);
				})
				.catch(err => {
					res.status(500).json({ error: err });
				});
		})
		.catch(err => {
			res.status(404).json({ message: "A post with that specific ID does not exist." });
		});
});

module.exports = router;