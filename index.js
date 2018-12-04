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

//Insert

//update

//remove

/* START LISTENING */

server.listen(PORT, () => {
	console.log("Listening on port:\t",PORT);
});
