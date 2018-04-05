const express = require('express');

server.get('/api/users/:id', (req, res) => {
  // Grab all Users
  const { id } = req.params;

  userDb
    .get(id)
    .then(response => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
