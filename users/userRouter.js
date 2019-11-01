const express = require('express');
const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb')



router.post('/', validateUsers, (req, res) => {
	Users.insert(req.body)
		.then(newUser => {
			console.log(newUser)
			return res.status(201).json({ Response: newUser })
		}).catch(err => res.status(500).json({ Message: "Error creating user!" }))
});

router.post('/:id/posts', validateUserIds, validatePosts, (req, res) => {

	const userPost = {
		user_id: req.body.user_id,
		text: req.body.text
	}

	Posts.insert(userPost)
		.then(newPost => {
			console.log(newPost)
			return res.status(201).json({ Response: newPost })
		}).catch(err => res.sendStatus(500)) //sends default status of 

});

router.get('/', (req, res) => {
	Users.get()
		.then(users => {
			return res.status(200).json({ Response: users })
		})
});

router.get('/:id', validateUserIds, (req, res) => {
	return res.status(200).json({ user: req.user })
});

router.get('/:id/posts', validateUserIds, (req, res) => {
	Users.getUserPosts(req.user.id)
		.then(userPosts => {
			return res.status(200).json({ Response: userPosts })
		})
});

router.delete('/:id', validateUserIds, (req, res) => {
	Users.remove(req.params.id)
		.then(() => {
			return res.status(200).json({ Success: "That user was successfully deleted!" })
		})
		.catch(err => res.status(500).json({ Error: "The database was unable to delete the user." }))
});

router.put('/:id', validateUserIds, (req, res) => {

	Users.update(req.user.id, req.body)
		.then(() => {
			return res.status(200).json({ Success: "The user's name was updated correctly!" })
		})
		.catch(err => res.status(500).json({ Success: "The server was unable to update the users name.", Error: err }))
});

//Including custom middleware to be utilized for validating user id and that the user has user data and a required name field included.

function validateUserIds(req, res, next) {
	const userId = req.params.id;
	Users.getById(userId)
		.then(user => {
			if (user) {
				req.user = user
				next()
			} else {
				return res.status(400).json({ Error: "You provided an invalid user id." })
			}
		})

};

function validateUsers(req, res, next) {
	// Check there is a req body and also a name field
	if (!req.body) {
		return res.status(400).json({ Error: "No user data provided!" });
	} else if (!req.body.name) {
		return res.status(400).json({ Error: "Required name field not provided." });
	}
	next();
};

function validatePosts(req, res, next) {
	// checking for the req body and also text field
	if (!req.body) {
		return res.status(400).json({ Error: "You are missing post data." });
	} else if (!req.body.text) {
		return res.status(400).json({ Error: "Required text field has not been provided." });
	}

	next();
};

module.exports = router;