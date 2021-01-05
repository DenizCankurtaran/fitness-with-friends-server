const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

let adminList = [];

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

const isAdmin = async (req, res, next) => {
    if(req.body.user){
        if(req.body.user.isAdmin){
            if (!adminList.includes(req.body.user._id)){
                const [err, user] = await UserService.findUserById(req.body.user._id);
                if(err){
                    res.status(500);
                    next(err);
                }else {
                    if(user.isAdmin){
                        adminList.push(user._id);
                        next();
                    }else {
                        res.status(404);
                        const error = new Error('not a admin');
                        next(error);
                    }   
                }
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
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
    errorHandler,
    isAdmin
}
