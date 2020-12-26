const CronJob = require('cron').CronJob;
const UserService = require('./services/UserService');
const ExerciseService = require('./services/ExerciseService');
const WorkoutService = require('./services/WorkoutService');

const job = new CronJob('40 15 * * *', async () => {
  console.log('start generating workouts');
  const [err, allUsers] = await UserService.findUsers({});
  if (err) {
    console.log(err, 'find users');
  } else {
    if (allUsers) {
      allUsers.forEach( async (user) => {
        
        let [error, workout] = await WorkoutService.findLatestWorkoutByUserId({userId: user._id});
        if (error) console.log(error);
        // console.log(workout);
        if (workout) {
          let absolvedExercises = workout.exercises.filter((exercise) => {
            return exercise.absolved;
          });

          let currentStreak = user.currentStreak;
          let highestStreak = user.highestStreak;

          if(absolvedExercises.length === workout.exercises.length){
            
            WorkoutService.updateWorkout(workout._id, {absolved: true, })
            currentStreak ++;

            if (currentStreak > user.highestStreak) {
              highestStreak ++; 
            }

          } else {
            currentStreak = 0;
          }
          console.log(user.username);
          console.log('currentStreak', currentStreak);
          console.log('highestStreak', highestStreak);


          UserService.updateUser(user._id, {currentStreak, highestStreak}); 
        }
        generate(user);
      });
    }
  }
}, null, false, 'Europe/Berlin');

const generate = async (user) => {
  let exerciseList = [];
  for(let i = 0; i < user.amount; i++) {
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

  WorkoutService.createWorkout({userId: user._id, exercises: exerciseList, username: user.username});

}
 

module.exports = {
  job,
  generate
};
