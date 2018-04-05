const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");

// GET ALL USERS FROM DATABASE

router.get("/", (req, res) => {
	db
		.get()
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET SINGLE USER FROM DATABASE

router.get("/:id", (req, res) => {
  const { id } = req.params;
	db
		.get(id)
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// ADD  USER TO DATABASE

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

// DELETE USER FROM DATABASE

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET USER POSTS

router.get('/', (req, res) => {
	const { userId } = req.params;
	console.log(userId)
	db
		.getUserPosts(userId)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

module.exports = router;
