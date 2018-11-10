const express = require("express");

const router = express.Router();

const db = require("../data/helpers/tagDb");

// GET ALL TAGS FROM DATABASE

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

// GET SINGLE TAG FROM DATABASE

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

// ADD TAG TO DATABASE

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

// DELETE TAG FROM DATABASE

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

module.exports = router;
