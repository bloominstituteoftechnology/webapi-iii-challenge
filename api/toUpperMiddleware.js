module.exports=(req, res, next)=>{
    const user= req.body.name.toUpperCase();
    req.body.name=user;
    next();
}