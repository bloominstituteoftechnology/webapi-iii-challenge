const express = 'express';
const Users = require('../users/userDb');
const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
	Users.get()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	Users.getById(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});

router.get('/:id/posts', (req, res) => {
	const userId = req.params.id;

	Users.getUserPosts(userId)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ error: 'The users posts could not be retrieved.' });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Users.remove(id)
		.then(data => {
			res.status(200).json({ message: 'You have successfully deleted this user.' });
		})
		.catch(err => {
			res.status(500).json({ error: 'This user could not be deleted' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Users.update(id, changes)
		.then(data => {
			res.status(200).json(changes);
		})
		.catch(err => {
			res.status(500).json({ error: 'The post information could not be modified.' });
		});
});

//custom middleware

function validateUserId(req, res, next) {
	if (req.users.id) {
		const id = req.users;
	} else {
		res.status(400).json({ message: 'invalid user id' });
	}
}

function validateUser(req, res, next) {
	if (req.body) {
	} else if (!req.body) {
		res.status(400).json({ message: 'missing user data' });
	} else if (!req.body.name) {
		res.status({ message: 'missing name field' });
	}
}

function validatePost(req, res, next) {
	if (req.body) {
	} else if (!req.body) {
		res.status(400).json({ message: 'missing post data' });
	} else if (!req.body.text) {
		res.status(400).json({ message: 'missing required text field' });
	}
}

module.exports = router;
