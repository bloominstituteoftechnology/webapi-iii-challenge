module.exports = {
    usercase: (req, res, next) => {
        if(req.body.username){
        req.body.username = req.body.username.toUpperCase();
        }
        next()
    }
}