const express = require('express');
const db = require('./data/helpers/userDb');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: "The posts information could not be retrieved."
        });
    });
});

app.post('/users', async (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  try {
    const userData = req.body;
    const userId = await db.insert(userData);
    res.status(201).json(userId);
  } 
  catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
      error
    })
  }
});

app.put('/users/:id', (req, res) => {
  // if(!req.body.title || !req.body.contents){
  //   res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  // }
  const changes = req.body;
  const { id } = req.params;
  db.update(id, changes).then(count =>
    res.status(200).json(count)
  ).catch(error => {
    res.status(500).json({
      message: 'error updating post',
      error
    })
  })
});

app.delete('/users/:id', (req, res) => {
  db.remove(req.params.id).then(count => {
    res.status(200).json(count)
  }).catch(error => {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
      error
    })
  })
});

app.listen(9000, () => console.log('\nThe Server is Alive on 9000!\n'));