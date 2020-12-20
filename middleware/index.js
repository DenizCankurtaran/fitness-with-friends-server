const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, { algorithm: "HS256" }, (err, user_id) => {
            if(err){
                res.status(404);
                const error = new Error('not authenticated');
                next(error);
            }else {
                next();
            }
        });
    } else {
        res.status(404);
        res.json({
            status: false,
            error: 'Bearer token missing'
        });
    }
}

const cannotGet = (req, res, next) => {
    const error = new Error(`cannot get ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'stack' : error.stack
    });
}

module.exports = {
    auth,
    cannotGet,
    errorHandler
}
