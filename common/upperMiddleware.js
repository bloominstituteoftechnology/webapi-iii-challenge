function upper(req, res, next) {
    const user = req.body;
    req.body.name = user.name.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    next();
}


module.exports = upper;