const express = require('express');

const db = require('../helpers/postDb.js');

const postRouter = express.Router();

//GET:

postRouter.get('/', (req, res) => {
	db
		.get()
		.then((posts) => {
			res.status(200).json({ success: true, posts });
		}) //headers
		.catch((err) => {
			res.status(500).json({ success: false, message: 'The user information could not be retrieved.' });
		});
});

//GET:

postRouter.get('/:id', (req, res) => {
	const { id } = req.params;

	db
		.getById(id)
		.then((posts) => {
			if (posts) {
				res.status(201).json({ success: true, posts });
			} else {
				res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The post information could not be retrieved.' });
		});
});

//POST:  // use for custom middleware 

postRouter.post('/', (req, res) => {
    const { text, user_id } = req.body;
    
	if (!text && !user_id ) {
		res.status(400).json({ error: 'Please provide User Id and text.' });
	} else {
		db
			.insert({ text, user_id })
			.then((post) => {
				res.status(201).json(post);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the post to the database' });
			});
	}
});

//DELETE:

postRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((post) => {
			if (post) {
				res.status(204).end();
			} else {
				res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

//PUT:

postRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db
		.update(id, changes)
		.then((postUpdate) => {
			if (!postUpdate) {
				res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.' });
			} else if ( !changes.text && !changes.user_id ) {
				return res.status(400).json({ success: false, message: 'Please provide the text and user id.' });
			} else {
				return res.status(200).json({ success: true, changes });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The post information could not be modified.' });
		})
});



module.exports = postRouter;
