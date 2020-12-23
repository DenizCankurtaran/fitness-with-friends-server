const express = require('express');
const router = express.Router();
const WorkoutService = require('../services/WorkoutService');
const UserService = require('../services/UserService');

router.post('/', async (req, res) => {
  let { level, _id } = req.body.user;
  let [err, user] = await UserService.findUserById(_id);
  if (err) {
    res.json({
      status: false,
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    if (user) {
      let [err, latestWorkout] = await WorkoutService.findLatestWorkoutByUserId({userId: _id});
      if (latestWorkout) {
        console.log(latestWorkout);
        res.json({
          status: true,
          latestWorkout
        });
      }

    } else {
      res.json({
        status: false,
        error: 'user does not exist',
      });
    }
  }
});

router.post('/history/', async (req, res) => {
  let { _id } = req.body.user;
  let [err, workouts] = await WorkoutService.findWorkouts({userId: _id});
  if (err) {
    res.status(500);
    res.json({
        status: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    res.json({
      status: true,
      workouts
    })
  }

});

module.exports = router;

