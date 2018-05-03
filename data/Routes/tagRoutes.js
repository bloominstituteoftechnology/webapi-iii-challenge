const express = require('express');

const db = require('../helpers/tagDb.js');

const upperTags = function (req, res, next) {
  req.body.tag = req.body.tag.toUpperCase();
  next();
};

function upperTagsRes(req, res, next) {
  var oldSend = res.send;

  res.send = function (data) {
    arguments[0] = arguments[0].toUpperCase();
    oldSend.apply(res, arguments);
  }
  next();
}

// const upperTagsRes = function (req, res) {
//   return (req.on("end", function () {
//     console.log(res.data);
//     res.data = res.data.map(tag => tag.toUpperCase());
//   })
//   )
// }; // Not working... yet!

const router = express.Router();

router.post('/', upperTags, (req, res, next) => {
  const userInformation = req.body;
  db
    .insert(userInformation)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(400).send({ Error: 'must be a unique value' });
    });
});


router.delete('/', function (req, res) {
  const { id } = req.query;
  let user;
  db
    .findById(id)
    .then(foundUser => {
      user = { ...foundUser[0] };

      db.remove(id).then(response => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

router.put('/:id', upperTags, function (req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count === 1) res.json('successfully updated')
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', upperTagsRes, (req, res) => {
  db
    .get()
    .then(users => {
      //middleware here?
      console.log("after middleware?\n")
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', upperTagsRes, (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(users => {
      if (users === undefined) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(users);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;