const express = require('express');
const router = express.Router();
const ExerciseService = require('../services/ExerciseService');


router.post('/create/', async (req, res) => {
  if (req.body.user.isAdmin){
    let {exercise, description, category, amount } = req.body.exercise;
    let [err, createdExercise] = await ExerciseService.createExercise({
        exercise,
        description: description ? description : '',
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
  } else {
    res.json({
      status: false,
      error: 'not allowed'
    })
  }
});

router.put('/update/', async (req, res) => {
  if(req.body.user.isAdmin){
    let {exercise, update} = req.body;
    let [err, updatedExercise] = await ExerciseService.updateExercise(exercise._id, update);
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
          updatedExercise
      });
    }
  } else {
    res.status(403);
    res.json({
        status: false,
        error: 'not allowed'
    });
  }

});

router.delete('/delete/', async (req, res) => {
  if(req.body.user.isAdmin){
    let { _id } = req.body.exercise;
      let [err, exercise] = await ExerciseService.deleteExercise(_id);

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

