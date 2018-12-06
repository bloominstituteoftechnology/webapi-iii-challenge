const express = require('express');

const router = express.Router();

// /api/user/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({message: 'user does not exist'});
      }
    })
    .catch(err => {
      res.status(500)
      .json({ message: 'unable to fullfill request' });
    });
});

module.exports = router;
