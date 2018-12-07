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

const maxNameLength = (req, res, next)  =>  {
    const user = req.body.user;
    if(user === undefined)  {
        next()
    }   else if(user.length > 128)   {
        res.status(422).json({ message: "User name is too long. Please submit a shorter name."});
    }   else {
        next();
    }
}
module.exports.manNameLength = maxNameLength;
module.exports.capUser = capUser;
