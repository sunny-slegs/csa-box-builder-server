'use strict';
const express = require('express');
const passport = require('passport');
let mongoose = require('mongoose');

const Box = require('../models/box');
const Vegetable = require('../models/vegetable');

const router = express.Router();

// protect endpoints
router.use(passport.authenticate('jwt', {session: false, failWithError: true}));

//get box by id
router.get('/:date', (req, res, next) => {
  const date = req.params.date;
  
  Box.findOne({pickUpDate: date})
    .then(result => {
      if (result) {
        // console.log(date, result,req.params, req.body, req.header);
        res.json(result);
      } else {
        // console.log(req.params, req.body, req.header);
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

//post a new box
router.post('/:date', (req, res, next) => {
  const {date} = req.params;
  const {userId} = req.user; 
  
  const newBox = {
    pickUpDate: date,
    userId: mongoose.Types.ObjectId(userId)
  };
  console.log(newBox);
  Box.create(newBox)
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};