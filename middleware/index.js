/*
    breaking it up this much is proof of concept,
    a single folder to hold all custom middle is probably reccomended
*/
const logger = require('./logger')
const validateUserId = require('./validateUserId')
const validateUser = require('./validateUser')

const warez = {
    logger,
    validateUserId,
    validateUser,
}

module.exports = warez