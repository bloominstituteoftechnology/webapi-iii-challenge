module.exports = {
  users: function(req, res, next) {
    let body = req.body;
    console.log(body.name.charAt(0));
    if (!body.name) {
      return res
        .status(400)
        .json({ error: "Please provide a name for this user." });
    }
    if (body.name.length > 128) {
      return res.status(400).json({ error: "name must be 128 characters" });
    }
    body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1);
    next();
  },

  posts: function(req, res, next) {
    let body = req.body;
    if (!(body.text && body.userId)) {
      return res
        .status(400)
        .json({ error: "Please provide text and userId for this post." });
    }
    next();
  },

  tags: function(req, res, next) {
    let body = req.body;
    if (!body.tag) {
      return res.status(400).json({ error: "Please provide a tag." });
    }
    if (body.tag.length > 80) {
      return res.status(400).json({ error: "tag must be less than 80 characters"})
    }
    next();
  },
};
