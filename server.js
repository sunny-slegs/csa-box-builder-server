'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');

const { PORT } = require('./config');
const { dbConnect } = require('./db-mongoose');

const {router: usersRouter} = require('./users/router');
const {router: authRouter} = require('./auth/router');
const {router: boxRouter} = require('./routes/boxes');
const {router: vegetableRouter} = require('./routes/vegetables');

const {localStrategy, jwtStrategy} = require('./auth/strategies');

const app = express();

app.use(bodyParser.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('api/users', usersRouter);
app.use('api/auth', authRouter);
app.use('api/box', boxRouter);
app.use('api/vegetable', vegetableRouter);

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Custom error handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
