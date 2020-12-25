const CronJob = require('cron').CronJob;
const UserService = require('./services/UserService');
const ExerciseService = require('./services/ExerciseService');
const WorkoutService = require('./services/WorkoutService');
//const schedule = cron.schedule('59 23 * * *', () => {

const job = new CronJob('30 9 * * *', async () => {
  console.log(new Date());
  console.log('start generating workouts');
  const [err, allUsers] = await UserService.findUsers({});
  if (err) {
    console.log(err, 'find users');
  } else {
    if (allUsers) {
      allUsers.forEach( async (user) => {
        let [error, workout] = await WorkoutService.findLatestWorkoutByUserId({userId: user._id});
        if (workout) {
          if ( workout.absolved ) {
            user.workoutStreak += 1;
            if (user.workoutStreak > user.highestStreak) {
              user.highestStreak = user.workoutStreak;
            }
          } else {
            user.workoutStreak = 0;
          }
          user.save();
        }
        generate(user);
      });
    }
  }
}, null, false, 'Europe/Berlin');

const generate = async (user) => {
  let exerciseList = [];
  for(let i = 0; i < 5; i++) {
    let [err, randomExercise ] = await ExerciseService.getRandomExercise("insert cat here");
    if (err) {
      console.log(err, 'get random exercise');
    } else {
      let {exercise, description, category, amount, machine, absolved} = randomExercise;
      let tmp = {
        exercise,
        description,
        category,
        amount,
        machine,
        absolved,
        _id: i
      } 
      exerciseList.push(tmp);
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
