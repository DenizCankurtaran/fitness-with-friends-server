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

router.post('/absolvedExercise/', async (req, res) => {
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
    let tmp = workout.exercises.map(exercise => {
      if (exercise._id.toString() === exerciseId.toString()) {
        exercise.absolved = req.body.exercise.absolved;
      }
      if (exercise.absolved) {
        counter++;
      }
      return exercise;
    });
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
    res.json({
      status: true,
      workouts
    })
  }

});

module.exports = router;

