const express = 'express';
const Users = require('../users/userDb');
const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json( error: "The users information could not be retrieved.")
    })
});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

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
