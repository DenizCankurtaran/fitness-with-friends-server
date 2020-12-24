const CronJob = require('cron').CronJob;
const UserService = require('./services/UserService');
const ExerciseService = require('./services/ExerciseService');
const WorkoutService = require('./services/WorkoutService');
//const schedule = cron.schedule('59 23 * * *', () => {

const job = new CronJob('0 14 * * *', async () => {
  console.log('start generating workouts');
  const [err, allUsers] = await UserService.findUsers({});
  if (err) {
    console.log(err, 'find users');
  } else {
    if (allUsers) {
      allUsers.forEach( (user) => generate(user));
    }
  }
});

const generate = async (user) => {
  let exerciseList = [];
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
    console.log(`Workout created ${workout}`);
  }
}
 

module.exports = {
  job,
  generate
};
