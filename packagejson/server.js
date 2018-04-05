const express = require("express");
// const db = require ('/data/db.js');
const server = express();

const helmet = require ('helmet');


server.use(helmet());

server.get("/", function(req, res) {
	res.send("Api: running");
});
//  [POST] `/users` This route should save a new user to the server.
server.post('/api/users'. function (req.res) {
	const user =req.body;
//db
.insert(user.then(response => {
	res.status(201.json(response);
	})
.catch(error=> {
	res.status(500).json({error: "There was an error while saving the user to the server"})
	})
	})
//[GET] `/users` This route will return an array of all users.
server.get('/api/posts', (req, res) => {
//db
.find()
.then (users => {
	res.json(users);
})
.catch(error => {
   res.status(500).json
	({error: ' The users information could not be retrieved'})
})
})

//[GET] `/users/:id` This route will return the user with the matching `id` property.
server.get ('/api/users/:id', (req, res) => {
const { id } = req.params;
//db
.findById(id)
.then (post => {
	res.json (post [0]);
})
.catch(error => {
	res.status(404).json({
		message: "The user with the specified ID does not exist." })
})
})
//* [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user
// you are searching for.  Return an array of all users whose names match the name provided.  This search should not
// be case sensitive.
server.get('/api/users/search?name=<query', (req, res) => {
	const{ user id } req.query;
//db
.findById(user id)
.then(users => {
	res.json(users[0]);
})
.catch(error => {
	res.status(500).json(error);
}) //});
}) //});



const port = 5000;
server.listen(port, () => console.log("Api is running on Port 5000"));
