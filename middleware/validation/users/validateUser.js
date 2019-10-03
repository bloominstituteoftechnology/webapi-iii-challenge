function validateUser(req, res, next) {
    const body = req.body
    const {name} = req.body
    if (!body) {
        res.status(400).json({errorMessage: "Missing data in body of request"})
    } 
    else if (!name) {
        res.status(400).json({errorMessage: "Missing data: user name"})
    } else {
        next();
    }
};

module.exports = validateUser;