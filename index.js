require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middleware = require('./middleware');

const port = process.env.PORT;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.use('/', routes.auth);
app.use(middleware.auth);

app.use('/user', routes.user);



app.use(middleware.cannotGet);
app.use(middleware.errorHandler);

app.listen(port, () => `Listening at http://localhost:${port}`);