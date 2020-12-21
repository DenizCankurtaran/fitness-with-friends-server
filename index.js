require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('./generateWorkout');
const routes = require('./routes');
const middleware = require('./middleware');
const database = require('./db');

console.log(process.env);

database.initDb();
schedule();

const port = process.env.PORT || 8080;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.use('/', routes.auth);
app.use(middleware.auth);

app.use('/user', routes.user);
app.use('/exercise', routes.exercise);
app.use('/workout', routes.workout);

app.use(middleware.cannotGet);
app.use(middleware.errorHandler);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));