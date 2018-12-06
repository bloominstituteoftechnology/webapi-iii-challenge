// Add dependancies
const DBuser = require("./data/helpers/userDb.js");
const DBpost = require("./data/helpers/postDb.js");
const EXP = require("express");
server = EXP();
console.log("Starting server...");
const PORT = 4000;

/* MAIN ENDPOINTS */

//Get
server.get('/',(req,res) => {
	res.send("Blogggy stuff");
});

// Uppercase names
const uppercase = (req,res,next) => {
	const name = req.body.name;
	if(name){
		req.body.name = name.toUpperCase();
	}
	next();
};

/* START LISTENING */

server.listen(PORT, () => {
	console.log("Listening on port:\t",PORT);
});

module.exports = {
	uppercase : uppercase
}
