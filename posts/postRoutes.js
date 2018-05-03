const express = require("express");
const postDB = require("../data/helpers/postDb");
const router = express.Router();

// DB schema
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.

// ROUTE HANDLERS /tags/tagRoutes

// GET - get list of all posts
router.get("/", (req, res) => {
	postDB
		.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// GET - get a posts by id
router.get("/:id", (req, res) => {
	const { id } = req.params;

	postDB
		.get(id)
		.then(post => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({ message: "id not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// POST: add a post to an existing user's posts
router.post("/", (req, res) => {
	const newPost = req.body;
	const { id } = req.params;

	// validate - a post should contain text and a userId
	if (newPost.text.length === 0 || !newPost.userId) {
		res
			.status(400)
			.json({ message: "Please provide text and a userId for the post" });
	} else {
		postDB
			.insert(newPost)
			.then(post => {
				res.status(200).json(newPost);
			})
			.catch(err => {
				res.status(500).json({
					error: "There was an error saving the post to the database"
				});
			});
	}
});

// DELETE: remove a post from the list
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	postDB
		.get(id)
		.then(post => {
			let postToBeDeleted = post;
			postDB.remove(id).then(count => {
				if (count === 0) {
					res.status(404).json({ message: "post not found" });
				} else {
					res.status(200).json(postToBeDeleted);
				}
			});
		})
		.catch(err => {
			res.status(500).json({ error: "post could not be deleted" });
		});
});

// PUT: update a post by id
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const update = req.body;

	if (update.text.length === 0 || !update.userId) {
		res
			.status(400)
			.json({ message: "Please provide text and a userId to update a post" });
	} else {
		postDB
			.update(id, update)
			.then(count => {
				if (count === 0) {
					res.status(404).json({ message: "post not found" });
				} else {
					res.status(200).json(update);
				}
			})
			.catch(err => {
				res.status(500).json({ error: "post could not be updated" });
			});
	}
});

module.exports = router;
