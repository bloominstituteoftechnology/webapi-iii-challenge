const express = require("express");
const userDB = require("../data/helpers/userDb");
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

// GETUSERSPOST: get a list of posts for a user
router.get("/userPosts/:id", (req, res) => {
	const { id } = req.params;

	userDB
		.get(id)
		.then(user => {
			if (user) {
				userDB.getUserPosts(id).then(userPosts => {
					if (userPosts.length === 0) {
						res.status(404).json({ message: "user has no posts!" });
					} else {
						res.status(200).json(userPosts);
					}
				});
			} else {
				res.status(404).json({ message: "user not found" });
			}
		})
		.catch(err => {
			res.status(500).json({
				error: "there was a problem retrieving the list of posts for this user"
			});
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
			res.status(500).json({ error: err });
		});
});

// POST: add a user to the list of users
router.post("/", (req, res) => {
	// define id
	const newUser = req.body;

	if (newUser.name.length === 0) {
		res.status(400).json({ error: "Please provide the user's name" });
	} else {
		userDB
			.insert(newUser)
			.then(user => {
				res.status(201).json(newUser);
			})
			.catch(err => {
				res.status(500).json({
					error: "There was an error saving the user to the database."
				});
			});
	}
});

// DELETE: remove a user from the list
router.delete("/:id", (req, res) => {
	// define id
	const { id } = req.params;

	userDB
		.get(id)
		.then(user => {
			let userToBeRemoved = user;
			userDB.remove(id).then(count => {
				if (count === 0) {
					res.status(404).json({ message: "user not found" });
				} else {
					res.status(200).json(userToBeRemoved);
				}
			});
		})
		.catch(err => {
			res.status(500).json({ error: "user could not be deleted" });
		});
});

// PUT: update a user by id
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const update = req.body;

	userDB
		.update(id, update)
		.then(count => {
			if (count === 0) {
				res.status(404).json({ message: "user not found" });
			} else {
				res.status(200).json(update);
			}
		})
		.catch(err => {
			res.status(500).json({ error: "user could not be changed" });
		});
});

module.exports = router;
