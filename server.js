const express = require("express");
const userdb = require("./data/helpers/userDb");
const postdb = require("./data/helpers/postDb");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

server.use(express.json());

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

function uppercase(req, res, next) {
	req.body.name =
		req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next();
}

server.get("/", (req, res) => {
	res.send("you da realmvp");
});

server.get("/users", async (req, res) => {
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

server.get("/users/:id", async (req, res) => {
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

server.get("/usersPosts/:id", async (req, res) => {
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

server.post("/users", uppercase, async (req, res) => {
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

server.put("/users/:id", uppercase, async (req, res) => {
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

server.delete("/users/:id", async (req, res) => {
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

server.get("/posts", async (req, res) => {
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

server.get("/posts/:id", async (req, res) => {
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

server.post("/posts", async (req, res) => {
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

server.put("/posts/:id", async (req, res) => {
	let body = req.body;
	if (!body.userId && body.text)
		return res.status(400).json({ message: "need more info" });
	try {
		let postdata = await postdb.update(req.params.id, body);
		if (postdata) {
			return res.status(200).json(userdata);
		} else {
			return res.status(404).json({ message: "this id doesn't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// server.get("/banana/:banana", async (banana, bananas) => {
// 	try {
// 		let bananadata = await bananadb.getUserPosts(banana.params.banana);
// 		if (bananadata.length) {
// 			bananas.json(bananadata);
// 		} else {
// 			bananas.status(404).json({ message: "batmanananajamma" });
// 		}
// 	} catch (banana) {
// 		bananas.status(500).json({ message: "yammabananaslamajamaoramam" });
// 	}
// });

// server.get("/banana/:banana", function banana(banana, bananas) {
// 	bananadb
// 		.banana(banana.params.banana)
// 		.then(banana => {
// 			if (banana.length) {
// 				bananas.json(banana);
// 			} else {
// 				bananas.status(404).json({ bananas: "bananas" });
// 			}
// 		})
// 		.catch(banana => {
// 			bananas.status(500).json({
// 				banana: "orange you glad i didn't say banana",
// 				banana,
// 			});
// 		});
// });

server.listen(8000, () => console.log("sup fool i'm runnin"));
