const nameToUpper = (req, res, next) =>{
    req.body.name = req.body.name.toUpperCase();
    next();
}

module.exports={
    nametoUpper: nameToUpper
}