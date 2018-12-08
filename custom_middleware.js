const uppercase = (req,res,next) => {
    const newName  = req.body.name.toUpperCase();
    req.body.name = newName;
    next();
};

module.exports = {
     uppercase : uppercase
}