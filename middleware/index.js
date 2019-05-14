const logger = require('./logger')
const validateUserId = require('./validateUserId')
const validateUser = require('./validateUser')

const warez = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
}

module.exports = warez