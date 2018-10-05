const express = require('express');
const router = express.Router();

const users = require('../data/helpers/userDb.js');
const posts = require('../data/helpers/postDb.js');
const tags = require('../data/helpers/tagDb.js');

//update a post
router.put('/:id', (req, res) => {
	//console.log(req.params)
	const id = req.params.id
	const {text} = req.body

	if (!req.body.text){
		res.status(400).json({msg: "Please provide content for editing post"})
	} else {
		posts
		.update(id, {text})
		.then(response => {
			if (response === 0){
				res.status(404).json({msg: 'The post with the specified Id does not exist'})
			}
			if (response === 1){
				res.status(200).json({response})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while deleting user'})
		})
	}
})

//delete a post
router.delete('/:id', (req, res) => {
	const id = req.params.id
	posts
	.remove(id)
	.then(response => {
		if (response === 0){
			res.status(404).json({msg: 'The post with ID does not exist'})
		}
		if (response === 1){
			res.status(200).json(response)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting user'})
	})
})

module.exports = router;
