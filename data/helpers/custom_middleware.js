
function upperCase(req, res, next){
        const name = req.body.name;
        name?req.body.name = name.toUpperCase():null;
        next();
    }
function hasName(req, res, next){
    const name = req.body.name;
    name?next():res.json({messege: "name is required"})
}

function hasID(req, res, next){
    const {id} = req.params
    id?next():res.json({ messege: "id is required"})
}
module.exports = {
    upperCase,
    hasName,
    hasID
}