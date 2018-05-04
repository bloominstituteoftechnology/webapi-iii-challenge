const express = require("express");
const tagDB = require("../data/helpers/tagDb");
const router = express.Router();
const { upperCaseTags } = require("../Middleware");

// DB schema
// id: number, no need to provide it when creating tags, the database will generate it.
// tag: string up to 80 characters long, must be a unique value.

// ROUTE HANDLERS /tags/tagRoutes

// GET: list of all tags
router.get("/", (req, res) => {
	tagDB
		.get()
		.then(tags => {
			res.status(200).json(tags);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// GET: tag by id
router.get("/:id", (req, res) => {
	// define id
	const { id } = req.params;

	tagDB
		.get(id)
		.then(tag => {
			if (tag) {
				res.status(200).json(tag);
			} else {
				res.status(404).json({ message: "tag not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// POST: add a user to the list of users
router.post("/", (req, res) => {
	// define new tag
	const newTag = req.body;

	if (!newTag.tag || newTag.tag.length === 0) {
		res.status(400).json({ error: "Please provide a tag name" });
	} else {
		tagDB
			.insert(newTag)
			.then(tag => {
				res.status(200).json(newTag);
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: "There was an error saving the tag to the database" });
			});
	}
});

// DELETE: remove a user from the list
router.delete("/:id", (req, res) => {
	// define id
	const { id } = req.params;

	tagDB
		.get(id)
		.then(tag => {
			// id is valid and tag exists delete the tag
			let tagToBeDeleted = tag;
			tagDB.remove(id).then(count => {
				if (count === 0) {
					res.status(404).json({ message: "tag not found" });
				} else {
					res.status(200).json(tagToBeDeleted);
				}
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

// PUT: update a user by id
router.put("/:id", (req, res) => {
	// define id and update data
	const { id } = req.params;
	const update = req.body;

	if (!update.tag || update.tag.length === 0) {
		res.status(400).json({ message: "Please provide a tag name" });
	} else {
		tagDB
			.update(id, update)
			.then(count => {
				if (count === 0) {
					res.status(404).json({ message: "user not found" });
				} else {
					res.status(200).json(update);
				}
			})
			.catch(err => {
				res.status(500).json({ error: "tag could not be updated" });
			});
	}
});

module.exports = router;
