const express = require("express");
const userDB = require("../data/helpers/userDB");
const router = express.Router();

// routes for "/api/users"
// DB schema
// id: number, no need to provide it when creating users, the database will generate it.
// name: up to 128 characters long, required.

// ROUTE HANDLERS /users/userRoutes

// GET: list of all users
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

// GET: user by id
router.get("/:id", (req, res) => {
	// define id
	const { id } = req.params;

	userDB
		.get(id)
		.then(user => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: "user not found" });
			}
		})
		.catch(err => {
			// res.status(404).json({ message: "user not found" });
			res.status(500).json({ error: err });
		});
});

module.exports = router;
