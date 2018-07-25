const express = require('express');
const dbpost = require('./data/helpers/postDb.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
        res.send('Testing');

});


server.get('/api/posts', (req, res) => {
        const request = dbpost.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The posts information could not be retrieved."});
        })

});

server.get('/api/posts/:id', (req, res) => {
        const id = req.params.id;

       const request = dbpost.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The post with the specified ID does not exist." });
         else {
		 response.id = id;
		 res.status(200).json(response);
	 }

        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

});




server.listen(7000, () => console.log('API running on port 7000'));


