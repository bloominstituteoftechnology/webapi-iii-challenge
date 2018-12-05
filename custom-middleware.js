const capUser = (req, res, next)    =>  {
    const user = req.body.user;
    if(user === undefined)  {
        next();
    }   else {
        let name = user.split(" ");
        name = name.map((item)  =>  {
            if(item.length > 1) {
                return item[0].toUpperCase() + item.slice(1);
            }   else {
                return item.toUpperCase();
            }
        })
        name = name.join(" ");
        res.locals.capName = name;
        next();
    }
}

module.exports.capUser = capUser;
