const express = require("express");
const dbUsers = require("./data/helpers/userDb.js");
const server = express();
const port = 6000;
const cors = require("cors");
server.use(cors());
server.use(express.json());

const upperCase = (req, res, next) => {
	req.name = req.body.name.toUpperCase();
	console.log(req.name);
	next();
};

server.get("/api/users", (req, res) => {
	dbUsers
		.get()
		.then(user => {
			res.status(200).json(user);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load users." });
		});
});

server.get("/api/users/:id", (req, res) => {
	const { id } = req.params;
	dbUsers
		.get(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load users." });
		});
});

server.post("/api/users", upperCase, (req, res) => {
	const name = req.name;
	if (!name) {
		res.status(400).json({ error: "You did not provide a name." });
	} else {
		const newUser = { name };
		dbUsers
			.insert(newUser)
			.then(userId => {
				dbUsers
					.get(userId)
					.then(user => {
						res.status(200).json(user);
					})
					.catch(() => {
						res.status(500).json({ error: "Could not load user." });
					});
			})
			.catch(() => {
				res
					.status(500)
					.json({ error: "There was an error while saving the user." });
			});
	}
});
server.put("/api/users/:id", upperCase, (req, res) => {
	const { id } = req.params;
	const name = req.name;
	if (!name) {
		res.status(400).json({ error: "Please provide a name for the user." });
	} else if (!id) {
		res.status(500).json({ error: `Could not find user with id of ${id}.` });
	} else {
		const thisUser = { name };
		dbUsers
			.update(id, thisUser)
			.then(isUpdated => {
				if (isUpdated !== 1) {
					res.status(500).json({ error: "User could not be updated." });
				} else {
					dbUsers
						.get(id)
						.then(user => {
							res.status(200).json(user);
						})
						.catch(() => {
							res.status(404).json({ error: "Could not load user." });
						});
				}
			})
			.catch(() => {
				res.status(404).json({ error: "Could not update user." });
			});
	}
});

server.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "Could not delete, id not found" });
	} else {
		const deletedUser = dbUsers
			.get(id)
			.then(user => {
				return user[0];
			})
			.catch(() => {
				res.status(404).json({ error: `Error finding user with id of ${id}` });
			});
		dbUsers
			.remove(id)
			.then(removedUser => {
				if (!removedUser) {
					res.status(500).json({ error: "This user could not be deleted." });
				} else {
					res.status(200).json(deletedUser._rejectionHandler0);
				}
			})
			.catch();
	}
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
