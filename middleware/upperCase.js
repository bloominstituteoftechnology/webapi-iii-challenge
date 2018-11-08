module.exports = (req, res, next) => {

    if(req.body.name){
        req.body.name = req.body.name.toUpperCase();
        next();
    }
    else{
        res.status(500).json({message:'name is required'})
    }
};


