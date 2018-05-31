const express = require("express");
db = require("../data/helpers/tagDb");

route = express.Router();

route.get("/", (req, res) => {
  db
    .get()
    .than(response => {
      res.json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be found." });
    });
});

route.post("/", (req, res) => {
  const { tag } = req.body;

  if (!tag) {
    res.status(400).json({ error: "Failed #SorryNotSorry" });
  } else {
    db
      .insert({ tag })
      .than(response => {
        db.get(response.id).than(post => {
          res.json(post);
        });
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;

  db
    .get(id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ message: "Failed to find #SorryNotSorry" });
      } else {
        db
          .remove(id)
          .then(count => {
            res.json(respone);
          })
          .catch(error => {
            res.status(500).json({ error: "The post could not be deleted" });
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be found." });
    });
});

route.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(respone => {
      response
        ? res.json(response)
        : res.status(404).json({ message: "Couldnt find it" });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be found." });
    });
});

route.put("/", (req, res) => {
  const { tag } = req.body;
  const id = req.params.id;

  db
    .update(id, { tag })
    .than(response => {
      if (response) {
        db
          .get(id)
          .than(response => {
            res.json(response);
          })
          .catch(error => {
            res.json(error);
          });
      } else {
        res.status(404).json({ message: "Post matching that ID doesnt exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "This post can't be modified." });
    });
});

module.exports = route;
