const express = require('express');
const router = express.Router();

const users = require('../data/helpers/userDb.js');
const posts = require('../data/helpers/postDb.js');
const tags = require('../data/helpers/tagDb.js');

//makes first letter in name capital
const middleUP = (req, res, next) => {
	const {name} = req.body;
	req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next()
}

//get all users
router.get('', (req, res) => {
	users
	.get()
	.then(users => {
		res.status(200).json(users)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: "the users information could not be recieved"})
	})
})

//gets a specific user
router.get('/:id', (req, res) => {
	const id = req.params.id
	users
	.get(id)
	.then(user => {
		if (!user){
			res.status(404).json({ msg: "The user with the specified ID does not exist." })
		} else {
			res.status(200).json(user)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "The user information could not be retrieved." })
	})
})

//gets all posts by specific user
router.get('/:id/posts', (req, res) => {
	const id = req.params.id
	users
	.getUserPosts(id)
	.then(userPosts => {
		if (userPosts.length === 0){
			res.status(404).json({msg: 'No posts at ID location'})
		} else {
			res.status(200).json(userPosts)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "Error recieved when accessing users posts" })
	})
})

//makes a new user
router.post('/', middleUP, (req, res) => {
	if (!req.body.name){
		res.status(400).json({msg: 'please provide name'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name' })
	} else {
		users
		.insert(req.body)
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "there was an error while saving user"})
		})
	}
})

//edits a user
router.put('/:id', middleUP, (req, res) => {
	const id = req.params.id
	if (!req.body.name){
		res.status(400).json({msg: 'please provide name'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name'})
	} else {
		users
		.update(id, req.body)
		.then(response => {
			if (response === 0){
				res.status(404).json({ msg: "The user with the specified ID does not exist." })
			}
			if (response === 1){
				res.status(200).json(response)
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while updating user'})
		})
	}
})

//delete a user
router.delete('/:id', (req, res) => {
	const id = req.params.id
	users
	.remove(id)
	.then(response => {
		if (response === 0){
			res.status(404).json({msg: 'The user with the specificed ID does not exist'})
		}
		if (response === 1){
			res.status(200).json({response})
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting user'})
	})
})

//user will create a new post to specific user
router.post('/:id/posts/', (req, res) => {
	const userId = parseInt(req.params.id)
	const {text} = req.body;
	users
	.get(userId)
	.then(response =>  {
		if (response === undefined){
			//console.log('no user there')
		res.status(400).json({msg: "Must be id of valid user"})
		} else {
			if (!req.body.text) {
				res.status(400).json({msg: "Please provide content for post"})
			} else {
				posts
				.insert({userId, text})
				.then(response => {
					res.status(201).json(response);
				})
				.catch(error => {
					console.log(error)
					res.status(500).json({msg: "There was an error while saving the post" })
				})
			}
		}
	})
})

module.exports = router;
