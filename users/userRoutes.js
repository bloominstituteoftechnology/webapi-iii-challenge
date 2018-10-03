const express = require("express");
const db = require("../data/helpers/userDb");
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(lotr => {  // <----calls this after the above call is successful
      res.status(200).json(lotr); //<== sends status code and then the data we ask for
    })                            //in this case a json of lotr characters
    .catch(err => {//<== calls this if above fails and sends back error
      console.error("error", err);
      res
        .status(500)
        .json({ error: "the user information could not be retreieved" });
    });
});

router.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(lotr => {
      res.status(200).json(lotr);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "the user information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  if (req.body.name.length < 128) {
    db.insert(req.body)
      .then(lotr => {
        res.status(201).json(lotr);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "the user information could not be posted" });
      });
  } else {
    res.status(401).json({ error: "tooLong" });
  }
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(lotr => {
      res.status(200).json(lotr);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "cannotUpdate" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(lotr => {
      res.status(200).json(lotr);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "cannotDelete" });
    });
});

module.exports = router;
