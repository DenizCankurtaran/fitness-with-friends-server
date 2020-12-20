const express = require('express');
const router = express.Router();
const ExerciseService = require('../services/ExerciseService');

router.get('/', async (req, res) => {
    let { level } = req.body.user;
    
});

router.post('/create/', async (req, res) => {
  let {exercise, description, level, category, amount } = req.body.exercise;
  let [err, createdExercise] = await ExerciseService.createExercise({
      exercise,
      description: description ? description : '',
      level,
      category,
      amount
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
          exercise: createdExercise
      })
  }
});

router.post('/finished/', async (req, res) => {

});

module.exports = router;

