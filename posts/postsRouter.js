const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb");

router.get("/", (req, res) => {
	db
		.get()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET SINGLE POST FROM DATABASE

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db
		.get(id)
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// ADD  POST TO DATABASE

router.post("/", (req, res) => {
	const user = req.body;
	db
		.insert(user)
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((error) => {
			res.status(500).json({
				error: "There was an error while saving the user to the database"
			});
		});
});

// DELETE POST FROM DATABASE

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET POST BY TAGS

router.get("/", (req, res) => {
	const { postId } = req.params;
	console.log(postId)
	db
		.getPostTags(postId)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

module.exports = router;
