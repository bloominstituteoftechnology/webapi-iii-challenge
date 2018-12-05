const gatekeeper = (req, res, next) => {   //gatekeeper before request reaches POST or PUT, 
                                        //'next' parameter lets request go through after condition met
    
    if (req.method === 'POST' || 'PUT') {
        const user = req.body;
        user.name.toUpperCase();
        next();
    } else {
        res.status(400).json({message: "name needs to be UpperCase"});
    }                                    
};

module.exports = {
    gatekeeper: gatekeeper
};

