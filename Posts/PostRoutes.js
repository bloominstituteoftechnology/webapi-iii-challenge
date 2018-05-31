const express = require("express");
db = require("../data/helpers/postDb");
tagDB = require("../data/helpers/tagDb");

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
  const { text, userId } = req.body;

  if (!text) {
    res.status(400).json({ error: "Failed #SorryNotSorry" });
  } else {
    db
      .insert({ text, userId })
      .than(response => {
        res.json(response);
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
    .then(respone => {
      if (respone.length === 0) {
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
      if (respone) {
        db.getPostTags(id).then(tags => {
          let obj = {
            post: respone,
            tags: tags
          };
          res.json(obj);
        });
      } else {
        res.status(404).json({ message: "Post matching that ID doesnt exist" });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be found." });
    });
});

route.put("/", (req, res) => {
  const { text } = req.body;
  const id = req.params.id;

  db
    .update(id, { text })
    .than(respone => {
      if (respone) {
        db.get(id).than(respone => {
          db
            .getPostTags(id)
            .than(tag => {
              let x = {
                post: respone,
                tags: tag
              };
              res.json(x);
            })
            .catch(error => {
              res.json(error);
            });
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
