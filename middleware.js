const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

function errorHandler(err, req, res, next) {
	console.error(err);
	switch (err.statusCode) {
		case 404:
			res.status(404).json({
				message:
					"Hey, buster.  There's no file by that name here ya ding-dong.",
			});
			break;

		default:
			res.status(500).json({
				message: "There was an error performing the required operation",
			});
			break;
	}
}
module.exports = server => {
	server.use(express.json());
	server.use(helmet());
	server.use(morgan("dev"));
	server.use(cors());
	server.use(errorHandler);
};
