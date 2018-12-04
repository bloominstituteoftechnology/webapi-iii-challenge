module.exports = {
    upperCase
};

function upperCase(req, res, next){
    const user = req.body;
    user.name = user.name.toUpperCase();
    next();
}