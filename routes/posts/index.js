const express = require('express');

const { postDb, userDb } = require('../../data/helpers');

const router = express.Router();

// get all posts
router.get('/', (req, res) => {
	postDb.get()
		.then(posts => res.status(200).json(posts))
		.catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});


// get posts with given post id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	postDb.get(id)
		.then(post => res.status(200).json(post))
		.catch(err => res.status(500).json({ error: `The post with the ID ${ id } does not exist.` }));
});

// get all post tags from post with given post id
router.get('/:id/tags', (req, res) => {
	const { id } = req.params;
	postDb.getPostTags(parseInt(id))
		.then(tags => {
			if (!tags.length) {
				return res.status(404).json({ error: `Either the post with ID ${ id } does not exist or it does not have any tags.` });
			}
			return res.status(200).json(tags);
		})
		.catch(err => res.status(500).json({ error: 'The post tags information could not be retrieved.' }));
});

// create new post from user with given user id and return all posts from that user
router.post('/:userId/', (req, res) => {
	const { userId } = req.params;
	const { text } = req.body;
	const newPost = { text: text, userId: userId };
	postDb.insert(newPost)
		.then(id => {
			return userDb.getUserPosts(parseInt(userId))
				.then(posts => res.status(201).json(posts))
				.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database.' }));
});

// update post with given post id
router.put('/:postId', (req, res) => {
	const { postId } = req.params;
	const { text } = req.body;
	const updatedPost = { text: text };
	postDb.update(parseInt(postId), updatedPost)
		.then(post => {
			if (!post) {
				return res.status(404).json({ error: `The post with the ID ${ postId } does not exist.` });
			}
			return res.status(200).json({ message: `The post with the ID ${ postId } was updated successfully.` });
		})
		.catch(err => res.status(500).json({ error: 'There was an error while updating the post information in the database.' }));
});

// delete post with given post id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	postDb.remove(parseInt(id))
		.then(del => {
			if (!del) {
				return res.status(404).json({ error: `The post with the ID ${ id } does not exist.` });
			}
			return res.status(200).json({ message: `The post with the ID ${ id } was successfully deleted.` });
		})
		.catch(err => res.status(500).json({ error: 'There was an error while deleting the post in the database.' }));
});

module.exports = router;
