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
	const { text } = req.body;
	const { userId } = req.params;
	const newPost = { text: text, userId: userId };
	postDb.insert(newPost)
		.then(id => {
			return userDb.getUserPosts(parseInt(userId))
				.then(posts => res.status(200).json(posts))
				.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database.' }));
});

// // update user with given id using yell middleware and return all users
// router.put('/:id', yell, (req, res) => {
// 	const { id } = req.params;
// 	const updatedUser = req.yelledUser;
// 	userDb.update(parseInt(id), updatedUser)
// 		.then(user => {
// 			if (!user) {
// 				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
// 			}
// 			return userDb.get()
// 				.then(users => res.status(200).json(users))
// 				.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
// 		})
// 		.catch(err => res.status(500).json({ error: 'There was an error while updating the user information in the database.' }));
// });

// // delete user with given id
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	userDb.remove(parseInt(id))
// 		.then(del => {
// 			if (!del) {
// 				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
// 			}
// 			return res.status(200).json({ message: `The user with id ${ id } was successfully deleted.` });
// 		})
// 		.catch(err => res.status(500).json({ error: 'There was an error while deleting the user in the database.' }));
// });

module.exports = router;
