const express = require("express");
const router = express.Router();
const postdb = require("./data/helpers/postDb");

router.get("/", async (req, res, next) => {
	try {
		let postdata = await postdb.get();
		if (postdata.length > 0) {
			return res.status(200).json(postdata);
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
		let postdata = await postdb.get(req.params.id);
		if (postdata) {
			return res.status(200).json(postdata);
		}
		return res.status(404).json({
			message: "no id found",
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	let body = req.body;
	try {
		if (body.text && body.userId) {
			let postdata = await postdb.insert(body);
			return res.status(200).json(postdata);
		} else {
			return res
				.status(400)
				.json({ message: "Bad form Trevor, bad form" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", async (req, res) => {
	let body = req.body;
	console.log(body);
	if (!body.userId && !body.text)
		return res.status(400).json({ message: "need more info" });
	try {
		let postdata = await postdb.update(req.params.id, body);
		if (postdata) {
			return res.status(200).json(postdata);
		} else {
			return res.status(404).json({ message: "this id doesn't exist" });
		}
	} catch (err) {
		res.status(500).json({ message: "500 err son" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		let postdata = await postdb.remove(req.params.id);
		if (postdata) {
			return res.status(200).json({ message: "you deleted!" });
		} else {
			return res.status(404).json({ message: "Id doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

function errorHandler(err, req, res, next) {
	console.error(err);
	switch (err.statusCode) {
		case 404:
			res.status(404).json({
				message: "The requested file does not exist.",
			});
			break;

		default:
			res.status(500).json({
				message: "There was an error performing the required operation",
			});
			break;
	}
}

module.exports = router;
