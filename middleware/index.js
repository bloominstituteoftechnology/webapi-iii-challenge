const logger = require('./logger')
const validateUserId = require('./validateUserId')
const validateUser = require('./validateUser')
const validatePost = require('./validatePost')

const warez = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
}

module.exports = warez