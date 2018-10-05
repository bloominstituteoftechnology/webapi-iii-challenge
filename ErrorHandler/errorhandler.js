const express = require('express');

const errorHandler = (err, req, res, next) => {
    const errors = {
        u12: {
            httpCode: 422,
            title: 'Required Field',
            description: 'The name must be specified',
            recoveryInstructions: 'Please provide a name and try again'
        },
        u13: {
            message: 'The email provide already exists',
        },
        u401: {
            httpCode: 401,
            message: 'You are not logged in, please login and try again'
        },
        u403: {
            message: 'You have no access to this information'
        },
        s00: {
            message: 'Unknown Sever Error'
        }
    };
  
    const error = errors[err];
    res.status(error.httpCode).json(error);
}

module.exports = errorHandler;
