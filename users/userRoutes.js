const express = require('express');
const userDB = require('../data/helpers/userDb.js');
const router = express.Router();

function upperUser(req, res, next){
	if (!req.body || !req.body.name){
		res.status(422).json({ message: 'A user needs a name' })
	} else {
		req.body.name = req.body.name[0].toUpperCase() + req.body.name.substr(1, req.body.name.length-1);
		next();
	}
}

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const users = await userDB.get();
			res.status(200).json(users);
		}
		catch(err) {
			// res.status(500).json({ message: 'Error getting the data' });
			next(err);
		}
	})
	.post(upperUser, async (req, res, next) => {
		const { name } = req.body;
		try {
			const count = await userDB.insert({name});
			res.status(201).json({ message: 'User successfully added' });
		}
		catch(err) {
			// res.status(500).json({ message: 'Something went wrong in our server' })
			next(err);
		}
	});

router
	.route('/:id')
	.get(async (req, res, next) => {
		const { id } = req.params;
		try {
			const user = await userDB.get(id);
			user
			? res.status(200).json(user)
			// : res.status(404).json({ message: 'Specified user could not be found' })
			: next({ statusCode: 404 });
		}
		catch(err) {
			// res.status(500).json({ message: 'Error getting the data' });
			next(err);
		}
	})
	.put(upperUser, async (req, res, next) => {
		const { id } = req.params;
		const { name } = req.body;
		try {
			const count = await userDB.update(id, {name});
			count > 0
			? res.status(200).json({ message: 'User successfully updated' })
			// : res.status(404).json({ message: 'Specified user could not be found '})
			: next({ statusCode: 404 })
		}
		catch(err) {
			// res.status(500).json({ message: 'Something went wrong in our server '})
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		const { id } = req.params;
		try {
			const count = await userDB.remove(id);
			count > 0
			? res.status(200).json({ message: 'User successfully deleted' })
			// : res.status(404).json({ message: 'Specified user could not be found' })
			: next({ statusCode: 404 })
		}
		catch(err) {
			// res.status(500).json({ message: 'Something went wrong in our server' });
			next(err);
		}
	 });

router
	.route('/:id/posts')
	.get(async (req, res, next) => {
		const { id } = req.params;
		try {
			const posts = await userDB.getUserPosts(id);
			posts.length > 0
			? res.status(200).json(posts)
			// : res.status(404).json({ message: 'User does not have posts' })
			: next({ statusCode: 404 })
		}
		catch(err) {
			// res.status(500).json({ message: 'Error getting the data' });
			next(err);
		}
	});

module.exports = router;