const express = require('express');
const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({"errorMessage":message});
}

const conErr = (err) => { //Logs the compiler error to the console
  console.log("Console Error:", err);
}

function upperCaser(req, res, next) {
  console.log("UpperCase is working"); //Verify to the console that local middleware is working
  req.body.tag = req.body.tag.toUpperCase();
  next()
}

router.use(express.json());
//BEGIN TAGS CRUD
router.get('/', async (req, res) => {
  try {
    const tags = await tagDb.get();
    res.status(200).json(tags);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tags could not be retrieved`, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await tagDb.get(req.params.id);
    res.status(200).json(tag);
  } catch(err) {
    conErr(err);
    return sendUserError(404, `Server Error: Tag ${req.params.id} could not be retrieved`, res);
  }
})

router.post('/', upperCaser, async (req, res) => {
  const { tag } = req.body;
  if (!tag) return sendUserError(400, `Bad Request: Please provide text for your tag`);
  else if (tag.length > 80) return sendUserError(400, `Bad Request: Your string is ${tag.length} characters, it should be less than 80`, res);
  try {
    const tags = await tagDb.get(); //Return tags array to check for uniqueness if next steps...

    function notUnique(tagObject) {
      return tagObject.tag.toUpperCase() === tag;
    } //Helper function to check if tag value is unique

    let check = tags.find(notUnique); //Checks if tag value is unique using a helper function

    if (check) return sendUserError(400, `Bad request: "${tag}" is already in the database choose a unique value`, res);
    const tagId = await tagDb.insert({tag});
    try {
      const tag = await tagDb.get(tagId.id);
      res.status(201).json(tag);
    } catch(err) {
      conErr(err);
      return sendUserError(404, `Not Found: Could not created tag with ID ${tagId.id}`, res);
    }
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tag could not be created`);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await tagDb.remove(req.params.id);
    if (result === 0) return sendUserError(404, `Not Found: No tag found with ID ${req.params.id}`, res);
    res.status(200).json({"Message":`Success! Tag ${req.params.id} succesfully deleted`})
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server error: tag ${req.params.id} could not be deleted`);
  }
});

router.put('/:id', upperCaser, async (req, res) => {
  const { tag } = req.body;
  if (tag.length > 80) return sendUserError(400, `Bad Request: Your string is ${tag.length} characters, it should be less than 80`, res);
  try {
    const result = await tagDb.update(req.params.id, {tag});
    if (result === 0) return sendUserError(404, `Not Found: Could not find tag with ID ${req.params.id}`, res);
    const updatedTag = await tagDb.get(req.params.id);
    res.status(200).json(updatedTag);
  } catch(err) {
    conErr(err);
    return sendUserError(500, `Server Error: Tag ${req.params.id} could not be updated`, res);
  }
});
//END TAGS CRUD

module.exports = router;
