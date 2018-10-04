const express = require("express");
const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb");
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
//CRUD operators for Posts
server.get("/api/posts", (req, res) => {
	dbPosts
		.get()
		.then(post => {
			res.status(200).json(post);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load posts." });
		});
});

server.get("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	dbPosts
		.get(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load posts." });
		});
});

server.post("/api/posts", (req, res) => {
	const { text, userId } = req.body;
	if (!text) {
		res.status(400).json({ error: "You did not provide a post text." });
	} else {
		const newPost = { text, userId };
		dbPosts
			.insert(newPost)
			.then(postId => {
				dbPosts
					.get(postId.id)
					.then(post => {
						res.status(200).json(post);
					})
					.catch(() => {
						res.status(500).json({ error: "Could not load post." });
					});
			})
			.catch(() => {
				res
					.status(500)
					.json({ error: "There was an error while saving the post." });
			});
	}
});

server.put("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	const { text, userId } = req.body;
	if (!text || !userId) {
		res.status(400).json({ error: "Please provide a name for the post." });
	} else if (!id) {
		res.status(500).json({ error: `Could not find post with id of ${id}.` });
	} else {
		const thisPost = { text, userId };
		dbPosts
			.update(id, thisPost)
			.then(isUpdated => {
				if (isUpdated !== 1) {
					res.status(500).json({ error: "Post could not be updated." });
				} else {
					dbPosts
						.get(id)
						.then(post => {
							res.status(200).json(post);
						})
						.catch(() => {
							res.status(404).json({ error: "Could not load post." });
						});
				}
			})
			.catch(() => {
				res.status(404).json({ error: "Could not update post." });
			});
	}
});

server.delete("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "Could not delete, id not found" });
	} else {
		let deletedPost;
		dbPosts
			.get(id)
			.then(post => {
				console.log(post);
			})
			.catch(() => {
				res.status(404).json({ error: "Error finding post" });
			});

		dbPosts
			.remove(id)
			.then(removedPost => {
				if (removedPost === 0) {
					res.status(500).json({ error: "This post could not be deleted." });
				} else {
					res.status(200).json(deletedPost);
				}
			})
			.catch(() => {
				res.status(500).json({ error: "id does not exist." });
			});
	}
});

//CRUD operators for Users
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
		let deletedUser;
		dbUsers
			.get(id)
			.then(user => {
				return (deletedUser = user);
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
					res.status(200).json(deletedUser);
				}
			})
			.catch();
	}
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
