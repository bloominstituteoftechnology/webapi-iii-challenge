
const express = require("express");
const router = express.Router();
const db = require("../helpers/tagDb.js");

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

// const convertToUpper = (req, res, next) => {
//   const sent = res.send
//   // console.log(res.send)
//   res.send = data => {
//     // console.log(JSON.parse(data)["tags"]);
//     let copyArray = Array.from(JSON.parse(data)["tags"]);
//     // console.log('copy', copyArray)
//     let tags = copyArray.map(obj => {
//       return Object.assign({}, obj, { tag: obj["tag"].toUpperCase() });
//     });
//     console.log(tags)

//     sent.apply(res, tags);
//   }
//   next();
// }

const convertToUpper = (req, res, next) => {
  const { id } = req.params;
  db.get()
    .then(tags => { // tags is an array of objects
        let tagsCopy;
      if(id) {
        tagsCopy = tags.filter(obj => {
          return obj.id == id
        });
          tagsCopy[0].tag = tagsCopy[0].tag.toUpperCase();
          tagsCopy = tagsCopy[0]
      }else{
        tagsCopy = tags.map(obj => {
          return Object.assign({}, obj, { tag: obj["tag"].toUpperCase() });
        });
      }
      console.log("tags: ", tagsCopy);
      console.log(req.body)
      req.body.tags = tagsCopy;
      // res.json(tagsCopy);
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
  next();
};

router.get("/", convertToUpper, (req, res) => {
  db
    .get()
    .then(tags => {
      res.json( req.body.tags );
    })
    .catch(error => {
      sendError(500, "The tags information could not be retrieved", res);
      return;
    });
});

router.get("/:id", convertToUpper,(req, res) => {
  const { id } = req.params; 
  db
    .get(id)
    .then(tag => {
      if (tag.length === 0) {
        sendError(404, `Tag with id ${id} could not found`, res);
        return;
      }
      res.json(req.body.tags);
    })
    .catch(error => {
      sendError(500, "Error looking up tag", res);
      return;
    });
});

router.post("/", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    sendError(400, "Must provide tag", res);
    return;
  }
  db
    .insert({ tag })
    .then(response => {
      db.get(response.id).then(tag => {
        res.json({ tag });
      });
    })
    .catch(error => {
      sendError(400, error, res);
      return;
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(tag => {
      if (tag === 0) {
        sendError(
          404,
          `Tag with id ${id} could not found, can not delete it.`,
          res
        );
        return;
      }
      res.json({ tag });
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error deleting tag", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  if (!tag) {
    sendError(400, "Must provide tag", res);
    return;
  }
  db
    .update(id, { tag })
    .then(response => {
      if (response == 0) {
        sendError(404, `tag with id ${id} could not found.`, res);
        return;
      }
      db.get(id).then(tag => {
        console.log(tag);
        if (tag.length === 0) {
          sendError(404, `tag with id ${id} could not found.`, res);
          return;
        }
        res.json({ tag });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});

module.exports = router;
