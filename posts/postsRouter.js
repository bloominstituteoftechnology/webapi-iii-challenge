const express = require('express')
const router = express.Router()
const postDB = require("../data/helpers/postDb");
const sendError = require('../config/functions')

router.get("/", async (req, res) => {
    try {
      const data = await postDB.get();
      res.json(data);
    } catch (err) {
      sendError(500, "The posts information could not be retrieved.", res);
    }
  });
  
  router.get("/:id", async (req, res) => {
     try{
    const { id } = req.params;
    const post = await postDB.get(id);
    if (post) {
      res.json(post);
    } else {
      sendError(404, "No post with that id", res);
    }
    }
    catch(err){
        sendError(500, 'The user who posted has been removed', res)
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const count = await postDB.remove(id);

    if (!count) {
      sendError(500, "No post deleted", res);
      return;
    }
    res.json('deleted')
  });
  
  router.post("/",  async (req, res) => {
    try {
      const { text, userId } = req.body;
      if (!text || !userId) {
        sendError(400, "must include text and userId", res);
        return;
      }
      const id = await postDB.insert({ text, userId });
      const post = await postDB.get(id.id);
      res.status(200).json(post);
    } catch (err) {
      sendError(500, "server error", res);
    }
  });
  
  router.put('/:id',  async (req,res) => {
      try {
          const {id} = req.params;
          const {text, userId} = req.body;
          let count = 0
          if (text){
              count += await postDB.update(id, {text})
          }
          if (userId){
              count += await postDB.update(id, {userId})
          }
          const post = await postDB.get(id)
          if (!count){
              sendError(404, 'Must include text and/or userID', res)
          }
          res.status(200).json(post)
      }catch(err){
          sendError(500, 'server error', res)
      }
  })

  module.exports=router