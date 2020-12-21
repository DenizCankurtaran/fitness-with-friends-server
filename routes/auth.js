const express = require('express');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
const router = express.Router();

router.post('/login/', async (req, res) => {
    const { username, password } = req.body.user;
    const [err, user] = await UserService.findUser({ username: username });
    if (err) {
        res.status(500);
        res.json({
            status: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? '' : err.stack
        });
    } else {
        if (user !== null) {
            await user.checkPassword(password, (err, isMatch) => {
                if (isMatch) {
    
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                        algorithm: 'HS256',
                        expiresIn: '2y'
                    });
    
                    res.status(200);
                    res.set('Authorization', `Bearer ${token}`);
                    res.json({
                        status: true,
                        user: {
                            username: user.username,
                            email: user.email,
                            isSeedling: user.isSeedling,
                            isAdmin: user.isAdmin,
                            isDeleted: user.isDeleted,
                            _id: user._id,
                            createdAt: user.createdAt
                        }
                    });
                } else {
                    res.status(403);
                    res.json({
                        status: false,
                        error: 'wrong password'
                    });
                }
            });
        } else {
            res.status(403);
            res.json({
                status: true,
                error: 'account doesnt exist'
            });
        }
        
    }
});

router.post('/signup/', async (req, res) => {
    let { username, password, level } = req.body.user;

    const [err, user] = await UserService.createUser({
        username,
        password,
        level
    });
    if (err) {
        res.status(403);
        res.json({
            status: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? '' : err.stack
        });
    } else {
        res.json({
            status: true
        });
    }
});

module.exports = router;
