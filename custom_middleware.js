module.exports = {
    upperCase
};

function upperCase(req, res, next){
    const user = req.body;
    if(user.name){
        user.name = user.name.toUpperCase();
    }
    next();
}