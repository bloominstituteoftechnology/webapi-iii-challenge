const router = require('express').Router()
const { delUser, getUsers, getUserPosts, postUser, updateUser } = require('./user/controller')
const { postTag } = require('./tag/controller')
const { catchErrors } = require('./middleware')

/* Users */
router.get('/api/user/:id?', catchErrors(getUsers))
router.get('/api/user/:id/posts', catchErrors(getUserPosts))
router.post('/api/user', catchErrors(postUser))
router.put('/api/user/:id', catchErrors(updateUser))
router.delete('/api/user/:id', catchErrors(delUser))

/* Posts */
router.post('/api/tag', catchErrors(postTag))

/* Tags */

module.exports = router