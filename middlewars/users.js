'use strict'

exports.nameCheck = (req, res, next) => {
    if (!req.body.name){
        res.status(500)
            .json({
                error: "Use name is not defined",
            })
    }
    next()
}