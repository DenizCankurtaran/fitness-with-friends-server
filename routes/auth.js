const express = require('express');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
const { generate } = require('../generateWorkout');
const router = express.Router();

router.post('/login/', async (req, res) => {
    const { username, password} = req.body.user;
    const [err, user] = await UserService.findUser({ username: username });
    console.log(username, password);
    if (err) {
        res.status(500);
        res.json({
            status: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? '' : err.stack
        });
    } else {
        if (user !== null) {
            user.checkPassword(password, (err, isMatch) => {
                console.log(err, isMatch);
                if (isMatch) {
                    
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                        algorithm: 'HS256',
                        expiresIn: '2y'
                    });
    
                    res.status(200);
                    res.set('Access-Control-Expose-Headers', 'Authorization');
                    res.set('Authorization', `Bearer ${token}`);
                    res.json({
                        status: true,
                        user: {
                            username: user.username,
                            isAdmin: user.isAdmin,
                            _id: user._id,
                            createdAt: user.createdAt,
                            level: user.level,
                            amount: user.amount,
                            theme: user.theme,
                            machines: user.machines,
                            currentStreak: user.currentStreak,
                            highestStreak: user.highestStreak
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
    let { username, password, level, amount } = req.body.user;

    const [err, user] = await UserService.createUser({
        username,
        password,
        level: level ? level: 0 ,
        amount: amount ? amount: 5
    });
    if (err) {
        res.status(403);
        res.json({
            status: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? '' : err.stack
        });
    } else {
        generate(user);
        res.json({
            status: true
        });
    }
});

module.exports = router;
