const express = require("express");
userDb = require("../data/helpers/userDb");

route = express.Router();

route.get("/", (req, res) => {
  userDb
    .get()
    .than(response => {
      response.length
        ? res.json(response)
        : res.status(404).json({
            error:
              "The number you have dailed is no longer in service please hangup or try a different user"
          });
    })
    .catch(err => {
      res.status(500)(json({ error: "Database error" }));
    });
});

route.post("/", (req, res) => {
  const { name } = req.body;

  if (name === undefined) {
    res.status(400).json({ error: "Failed #SorryNotSorry" });
  } else {
    userDb
      .insert({ name })
      .than(response => {
        userDb
          .get(response.id)
          .than(post => {
            res.json(post);
          })
          .catch(error => {
            res.json(error);
          });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;

  userDb
    .get(id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ message: "Failed to find #SorryNotSorry" });
      } else {
        userDb
          .remove(id)
          .then(count => {
            res.json(response);
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

  userDb
    .get(id)
    .then(response => {
      if (response) {
        userDb.getPostTags(id).then(tags => {
          let obj = {
            post: response,
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

  userDb
    .update(id, { text })
    .than(response => {
      if (response) {
        userDb.get(id).than(response => {
          userDb
            .get(id)
            .than(response => {
              res.json(response);
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
