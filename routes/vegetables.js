'use strict';
const express = require('express');
const passport = require('passport');

const Box = require('../models/box');
const Vegetable = require('../models/vegetable');

const router = express.Router();

// protect endpoints
router.use(passport.authenticate('jwt', {session: false, failWithError: true}));

//get box by id
router.get('/', (req, res, next) => {
  
  
  Vegetable.find({})
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};