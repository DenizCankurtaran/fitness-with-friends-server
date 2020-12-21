const cron = require('node-cron');
const UserService = require('./services/UserService');
const ExerciseService = require('./services/ExerciseService');
const WorkoutService = require('./services/WorkoutService');
//const schedule = cron.schedule('59 23 * * *', () => {

const schedule = () => cron.schedule('59 23 * * *', async () => {
  console.log('mach generieren');
  const [err, allUsers] = await UserService.findUsers({});
  if (err) {
    console.log(err, 'find users');
  } else {
    if (allUsers) {
      allUsers.forEach( async (user) => {
        let exerciseList = [];
        // user; level
        // execises
        // Brust, Bauch, Arme, Beine, Rücken, Po, Waden, Schultern, 

        // let listOfExcerisess = Array(5).fill(0).map(async () => {
        //   let [err, exercise ] = await ExerciseService.getRandomExercise("insert cat here");
        //   if (err) {
        //     console.log(err, 'get random exercise');
        //   } else {
        //     return exercise
        //   }
        // });
        for(let i = 0; i < 5; i++) {
          let [err, exercise ] = await ExerciseService.getRandomExercise("insert cat here");
          if (err) {
            console.log(err, 'get random exercise');
          } else {
            exerciseList.push(exercise);
          }
        }

        let [err, workout] = await WorkoutService.createWorkout({userId: user._id, exercises: exerciseList, username: user.username});
        if (err) {
          console.log(err, 'create workout');
        } else {
          // console.log(`Workout created ${workout}`);
        }
      });
    }
  }
});

module.exports = schedule;