const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const WorkoutService = require('../services/WorkoutService');

router.post('/one/', async(req, res) => {
  let [err, user] = await UserService.findUserById(req.body.query._id);
  if (err) {
      res.status(500);
      res.json({
          status: false,
          error: err.message,
          stack: process.env.NODE_ENV === 'production' ? '' : err.stack
      })
  } else {
      res.status(202);
      res.json({
          status: true,
          user: user
      });
  }
});

router.post('/search/', async (req, res) => {
let { _id } = req.body.user;
let { username } = req.body.query;
let [err, user] = await UserService.findUserById(_id);
if (err) {
  res.status(500);
  res.json({
    status: false,
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  });
} else {
    let [error, users] = await UserService.findUsers(username);
    if (error) {
      res.status(500);
      res.json({
        status: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'production' ? '' : error.stack
      });
    } else {
      let searchList = [];
      for (const result of users) {
        if (user.friends.indexOf(result._id) === -1 && user._id.toString() !== result._id.toString() ) {
          let friend = {
            username: result.username,
            _id: result._id,
            level: result.level,
            friends: result.friends,
            theme: result.theme
          }
          searchList.push(friend)
        }
      }
      res.json({
        status: true,
        users: searchList
      })
    }
  }
});

router.post('/friends/', async (req, res) => {
  let { _id } = req.body.user;
  let [err, user] = await UserService.findUserById(_id);
  if (err) {
    res.status(500);
    res.json({
      status: true,
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '' : error.stack
    });
  } else {
    let friends = [];
    for (const friendId of user.friends){
      let [error, result] = await UserService.findUserById(friendId);
      if (error) {
        console.log(error);
      } else {
        let friend = {
          username: result.username,
          _id: result._id,
          level: result.level,
          friends: result.friends,
          theme: result.theme
        }
        friends.push(friend);
      }
    }
    res.json({
      status: true,
      friends
    });
  }
});
  

router.put('/add/', async (req, res) => {
  let { _id } = req.body.user;
  let friendId = req.body.friend._id; // UwU
  let [err, user] = await UserService.findUserById(_id);
  if (err) {
    res.status(500);
    res.json({
        status: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    const [err, friend] = await UserService.findUserById(friendId);
    if (err) {
      res.status(500);
      res.json({
          status: false,
          error: err.message,
          stack: process.env.NODE_ENV === 'production' ? '' : err.stack
      });
    } else {
      let index = user.friends.indexOf(friendId);
      if (index !== -1) {
        user.friends.splice(index, 1);
      } else {
        user.friends.push(friendId);
      }
      user.save();
      res.json({
        status: true
      });
    }
  }

});

router.post('/friendsprogress/', async (req, res) => {
  let { _id } = req.body.user;
  let [err, user] = await UserService.findUserById(_id);
  if (err) {
    res.status(500);
    res.json({
        status: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    let listOfFriendsWorkout = [];

    for(const id of user.friends){
      let [err, workout] = await WorkoutService.findLatestWorkoutByUserId({userId: id});
      if (err){
        console.log(err, 'Line 91 user.js');
      } else {
        listOfFriendsWorkout.push(workout);
      }
    }
    res.json({
      status: true,
      listOfFriendsWorkout
    });
  }

});

router.put('/update/', async (req, res) => {
  let {user, update} = req.body;
  let [err, updatedUser] = await UserService.updateUser(user._id, update);
  if (err) {
      res.status(500);
      res.json({
          status: false,
          error: err.message,
          stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    res.status(202);
    res.json({
    status: true,
    updatedUser
    });
  }
});

router.delete('/delete/', async (req, res) => {
  let {user, delUser} = req.body;
  if(user._id === delUser._id){
      let [err, user] = await UserService.deleteUser(delUser._id);

      if (err) {
          res.status(500);
          res.json({
              status: false,
              error: err.message,
              stack: process.env.NODE_ENV === 'production' ? '' : err.stack
          });
      } else {
          res.status(202);
          res.json({
              status: true,
              user: user
          });
      }
  }else {
      res.status(403);
      res.json({
          status: false,
          error: 'not allowed'
      });
  }
  
});

module.exports = router;