'use strict'

exports.nameCheck = (req, res, next) => {
    if (!req.body.name){
        res.status(500)
            .json({
                error: "User name is not defined",
            })
    }
    next()
}

exports.idCheck = (req, res, next) => {
    if (!req.params.id){
        res.status(500)
            .json({
                error: "ID is not included in url",
                errorId: req.params
            })
    }
    next()
}