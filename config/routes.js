const usersRouter = require('../users/usersRouter');

const users = server => {
    server.use('/api/users', usersRouter)
};

module.exports = {
    usersRouter: users
};


