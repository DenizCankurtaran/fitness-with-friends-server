const express = require('express');
const router = express.Router();
const WorkoutService = require('../services/WorkoutService');
const UserService = require('../services/UserService');
const User = require('../schemas/UserSchema');

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

router.post('/update/', async (req, res) => {
  let { _id } = req.body.workout;
  let [err, workout] = await WorkoutService.update(_id, req.body.update);
  if (err) {
    res.status(500);
    res.json({
      status: true,
      latestWorkout
    });
  } else {
    res.json({
      status: true,
      workout
    })
  }
});

router.post('/absolvedexercise/', async (req, res) => {
  let workoutId = req.body.workout._id;
  let exerciseId = req.body.exercise._id;
 
  let [err, workout] = await WorkoutService.findWorkoutById(workoutId);
  if (err) {
    res.status(500);
    res.json({
      status: true,
      latestWorkout
    });
  } else {
    let counter = 0;
    let tmp = workout.exercises.map((exercise, index) => {
      if (index === exerciseId) {
        exercise.absolved = req.body.exercise.absolved;
      }
      if (exercise.absolved) {
        counter++;
      }
      return exercise;
    });
    // console.log(tmp);
    let [error, updatedWorkout] = await WorkoutService.updateWorkout(workoutId,{exercises: tmp, progress: counter});
    if (error){
      res.status(500);
      res.json({
        status: true,
        latestWorkout
      });
    } else {
      res.json({
        status: true,
        updatedWorkout
      })
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
    workouts.shift();
    res.json({
      status: true,
      workouts
    })
  }

});

router.post('/getcheers/', async (req, res) => {
  let { _id } = req.body.user;
  let [err, workout] = await WorkoutService.findLatestWorkoutByUserId({userId: _id});
  if (err) {
    res.status(500);
    res.json({
        status: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    let cheers = [];
    for (const cheer of workout.cheers) {
      let [error, user] = UserService.findUserById(cheer);
      if (error) console.log(error);
      else {
        cheers.push(user.username);
      }
    }
    res.json({
      status: true,
      cheers
    })
  }
});

router.put('/cheer/', async (req, res) => {
  let { _id } = req.body.user;
  let friendId = req.body.friend._id;
  let [err, workout] = await WorkoutService.findLatestWorkoutByUserId({userId: friendId});
  if (err) {
    res.status(500);
    res.json({
        status: false,
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    });
  } else {
    let index = workout.cheers.indexOf(_id);
    if (index === -1) {
      workout.cheers.push(_id);
      workout.save();
    }
    res.json({
      status: true
    });
  }
});

module.exports = router;

