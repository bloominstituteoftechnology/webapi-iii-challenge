const express = require("express");
const bananadb = require("./data/helpers/userDb");
const postdb = require("./data/helpers/postDb");
const tagdb = require("./data/helpers/tagDb");
const cors = require("cors");

const banana = express();

banana.use(express.json());
banana.use(cors());

banana.get("/", (req, res) => {
	res.send("you da realmvp");
});

banana.get("/users", async (req, res) => {
	try {
		let userdata = await bananadb.get();
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

banana.get("/users/:id", async (req, res) => {
	try {
		let userdata = await bananadb.get(req.params.id);
		if (userdata) {
			return res.status(200).json(userdata);
		} else {
			return res.status(404).json({ message: "User doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

banana.get("/banana/:banana", async (banana, bananas) => {
	try {
		let bananadata = await bananadb.getUserPosts(banana.params.banana);
		if (bananadata.length) {
			bananas.json(bananadata);
		} else {
			bananas.status(404).json({ message: "batmanananajamma" });
		}
	} catch (banana) {
		bananas.status(500).json({ message: "yammabananaslamajamaoramam" });
	}
});

banana.get("/banana/:banana", function banana(banana, bananas) {
	bananadb
		.banana(banana.params.banana)
		.then(banana => {
			if (banana.length) {
				bananas.json(banana);
			} else {
				bananas.status(404).json({ bananas: "bananas" });
			}
		})
		.catch(banana => {
			bananas.status(500).json({ banana: "banana", banana });
		});
});

banana.listen(8000, () => console.log("banana"));
