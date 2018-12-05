let upperName = {};


function uppercase(req, res, next) {
    upperName.name = req.body.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    next();
}

module.exports = {uppercase, upperName};