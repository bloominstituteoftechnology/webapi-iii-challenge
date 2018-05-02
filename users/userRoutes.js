const express = require("express");
const userDB = require("../data/helpers/userDB");
const router = express.Router();
// routes for "/api/users"
// need get, insert, update, remove, getUserPosts route handlers

// DB schema
// id: number, no need to provide it when creating users, the database will generate it.
// name: up to 128 characters long, required.

// ROUTE HANDLERS /users/userRoutes
router.get("/", (req, res) => {
	userDB
		.get()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

module.exports = router;
