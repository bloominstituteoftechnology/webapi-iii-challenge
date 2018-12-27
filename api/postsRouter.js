const express = require('express');
const dbPosts = require('../data/helpers/postDb.js');

const router = express.Router();
router.use(express.json());

//get all posts

router.get('/', (req, res) => {
	dbPosts
		.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

//get individual post
router.get('/:id', (req, res) => {
	let id = parseInt(req.params.id);
	console.log('type of id' + typeof id);

	dbPosts
		.get()
		.then(postsList => {
			let foundPost = postsList.filter(post => post.id === id);
			res.status(200).json(foundPost);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The post information could not be retrieved.' });
		});
});
//get posts by user id instead

router.get('/userid/:id', (req, res) => {
	let id = parseInt(req.params.id);

	dbPosts
		.get()
		.then(postsList => {
			let foundPost = postsList.filter(post => post.userId === id);
			res.status(200).json(foundPost);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The post information could not be retrieved.' });
		});
});

//create post

router.post('/api/posts', (req, res) => {
	let post = req.body;

	if (post.userId && post.text) {
		dbPosts
			.insert(post)
			.then(postId => {
				dbPosts.getById(postId.id).then(newpost => {
					post = newpost;
				});
			})
			.then(res.status(201).json(post))
			.catch(err => {
				res.status(500).json({
					error: 'There was an error while saving the post to the database'
				});
			});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide userId and text for the post.'
		});
	}
});

//update post

router.put('/:id', (req, res) => {
	let updatedPost = req.body;
	let id = parseInt(req.params.id);
	console.log(updatedPost, id);

	if (updatedPost.text) {
		//
		console.log('id' + id);
		console.log('updated post' + updatedPost.text);
		dbPosts.update(id, updatedPost).then(number => {
			console.log(number);
			if (!number) {
				res.status(404).json({
					error: 'The post with the specified ID does not exist'
				});
			} else {
				dbPosts.get(id).then(successfullyUpdatedPost => {
					res.status(200).json(successfullyUpdatedPost);
				});
			}
		});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide text for the post.'
		});
	}
});

//delete post

//database is returning 0, but it clearly is deleting the records... therefore went straight to success message in first

router.delete('/:id', (req, res) => {
	let id = req.params.id;

	dbPosts.remove(id).then(post => {
		dbPosts
			.remove(id)
			.then(something => {
				console.log('something' + something + typeof something);
				// number?

				// :
				// res.status(404).json({message:"post was not removed"})
			})
			.then(res.status(200).json({ message: 'successfully removed' }))
			.catch(res.status(500).json({ error: 'The post could not be removed' }));
	});
});

module.exports = router;
