const express = require("express");
const tagDB = require("../data/helpers/tagDb");
const router = express.Router();

// DB schema
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.

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
	console.log(id);

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

module.exports = router;
