'use strict'

exports.inputCheck = (req, res, next) => {
    if (!req.body.userId || !req.body.text)
        res.status(500)
            .json({
                error: 'UserId or text is not included'
            })
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