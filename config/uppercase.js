module.exports = (req, res, next) => {
    if (req.body.name !== undefined) {
        const reqName = req.body.name;
        const checkName = req.body.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (reqName === checkName) {
            next();
        } else {
            req.body.name = checkName;
            next();
        }
    } else {
        next();
    }
};