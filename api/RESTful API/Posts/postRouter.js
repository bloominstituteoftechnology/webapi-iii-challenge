const express = require('express');
const router = express.Router();
const userDB = require('../../../data/helpers/postDb');

//////////////POST SECTION///////////////

// get all posts
router.get('/api/posts/all', (req, res) => {
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
router.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	postDB.get(id).then((post) => {
		post.length <= 0 ? res.status(404).json({ message: 'That post was not found' }) : res.status(200).json(post);
	});
});
// test success

// delete a post by id
router.delete('/api/posts/:id', (req, res) => {
	postDB.remove(req.params.id).then((count) => {
		count
			? res.status(200).json({ message: 'Post deleted successfully' })
			: res.status(404).json({ message: 'That post was not found or already deleted' });
	});
});
//test success

// update a post by id
router.put('/api/posts/:id', (req, res) => {
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

module.exports = router;
