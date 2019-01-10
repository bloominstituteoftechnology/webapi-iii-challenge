const express = require("express");
const router = express.Router();

const userdb = require("./data/helpers/userDb");

function uppercase(req, res, next) {
	req.body.name =
		req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next();
}

router.get("/", async (req, res) => {
	try {
		let userdata = await userdb.get();
		if (userdata.length > 0) {
			return res.status(200).json(userdata);
		}
		return res.status(404).json({
			message: "that's why i'm sober on weekends except for alcohol",
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		let userdata = await userdb.get(req.params.id);
		if (userdata) {
			return res.status(200).json(userdata);
		} else {
			return res.status(404).json({ message: "User doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/Posts/:id", async (req, res) => {
	try {
		let userdata = await userdb.getUserPosts(req.params.id);
		if (userdata.length > 0) {
			return res.status(200).json(userdata);
		} else {
			return res.status(404).json({ message: "Id not found" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", uppercase, async (req, res) => {
	let body = req.body;
	try {
		if (body.name) {
			let userdata = await userdb.insert(body);
			return res.status(200).json(userdata);
		} else {
			return res.status(400).json({ message: "Enter info" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", uppercase, async (req, res) => {
	let body = req.body;
	if (!body.name) return res.status(400).json({ message: "need more info" });
	try {
		let userdata = await userdb.update(req.params.id, body);
		if (userdata) {
			return res.status(200).json(userdata);
		} else {
			return res.status(404).json({ message: "This ide doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let userdata = await userdb.remove(req.params.id);
		if (userdata) {
			return res.status(200).json({ message: "❤🐱‍💻🐱‍👓" });
		} else {
			return res.status(404).json({ message: "Id doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
