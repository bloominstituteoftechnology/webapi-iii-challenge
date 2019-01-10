const express = require("express");
const usersRoute = require("./usersRoute");
const postsRoute = require("./postsRoute");
const path = require("path");

// const cors = require("cors");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const path = require("path");
const server = express();
server.use("/users", usersRoute);
server.use("/posts", postsRoute);

const configureMiddleware = require("./middleware");

server.get("/download", (req, res, next) => {
	const filePath = path.join(__dirname, "index.html");
	res.sendFile(filePath, err => {
		// if there is an error the callback function will get an error as it's first argument
		if (err) {
			// we could handle the error here or pass it down to error-handling middleware like so:
			next(err); // call the next error-handling middleware in the queue
		} else {
			console.log("File sent successfully");
		}
	});
});

// server.use(express.json());
// server.use(helmet());
// server.use(morgan("dev"));
// server.use(cors());

// server.use(errorHandler);
configureMiddleware(server);
server.listen(8000, () => console.log("sup fool i'm runnin"));

// function errorHandler(err, req, res, next) {
// 	console.error(err);
// 	switch (err.statusCode) {
// 		case 404:
// 			res.status(404).json({
// 				message:
// 					"Hey, buster.  There's no file by that name here ya ding-dong.",
// 			});
// 			break;

// 		default:
// 			res.status(500).json({
// 				message: "There was an error performing the required operation",
// 			});
// 			break;
// 	}
// }

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
