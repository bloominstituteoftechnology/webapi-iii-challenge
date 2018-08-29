'use strict'

const _usersDB = require('../data/helpers/userDb')

exports.getUsers = async (req, res) => {
    try{
        const users = await _usersDB.get()
        res.status(200)
            .json({
                users
            })
    }catch(err){
        res.status(500)
            .json({
                error: "Users information can not be retirved",
                errorLog: err
            })
    }
}

exports.insertUser = async (req, res) => {
    try{
        const newUser = await _usersDB.insert(req.body)
        res.status(200)
            .json({
                newUser
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a problem in inserting new user",
                errorLog: err
            })
    }
}
