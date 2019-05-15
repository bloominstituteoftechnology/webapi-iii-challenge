const logger = require('./logger')
const validatePostId = require('./validatePostId')
const validatePost = require('./validatePost')
const validateUserId = require('./validateUserId')
const validateUser = require('./validateUser')

const warez = {
    logger,
    validateUserId,
    validateUser,
    validatePostId,
    validatePost,
}

module.exports = warez