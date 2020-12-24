require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { job } = require('./generateWorkout');
const routes = require('./routes');
const middleware = require('./middleware');
const database = require('./db');

database.initDb();
job.start();


const port = process.env.PORT || 8080;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: 'F.I.T by Görkem Yalcinkaya, Deniz Cankurtaran \r\n https://github.com/DenizCankurtaran/fit-in-time'
  });
});
app.use('/', routes.auth);
// app.use(middleware.auth);

app.use('/user', routes.user);
app.use('/exercise', routes.exercise);
app.use('/workout', routes.workout);
app.use('/category', routes.category);

app.use(middleware.cannotGet);
app.use(middleware.errorHandler);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));