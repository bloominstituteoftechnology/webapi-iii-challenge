const express = require("express");
const postDB = require("../data/helpers/postDb");
const router = express.Router();

// DB schema
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// userId: number, required, must be the id of an existing user.
// text: string, no size limit, required.

// ROUTE HANDLERS /tags/tagRoutes

//

// modules.exports = router;
