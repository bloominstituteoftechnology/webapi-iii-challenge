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

	// validate - text should not be empty/userId should be valid
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

module.exports = router;
