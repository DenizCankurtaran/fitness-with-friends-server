const express = require('express');
const router = express.Router();
const WorkoutService = require('../services/WorkoutService');

router.post('/create/', async (req, res) => {
  let { _id } = req.body.user;
  let { exercises } = req.body.workout;
  let [err, workout] = await WorkoutService.createExercise({
      exercises,
      userId: _id
  });
  if (err) {
      res.status(500);
      res.json({
          status: false,
          error: err.message,
          stack: process.env.NODE_ENV === 'production' ? '' : err.stack
      })
  } else {
      res.json({
          status: true,
          workout
      })
  }
});

module.exports = router;

