'use strict';
const express = require('express');
const passport = require('passport');

const Box = require('../models/box');
//const Vegetable = require('../models/vegetable');
//const {availableVegetables} = require('../available-vegetables'); 

const router = express.Router();

// protect endpoints
router.use(passport.authenticate('jwt', {session: false, failWithError: true}));

//get box by id
router.get('/:date', (req, res, next) => {
  const date = req.params.date;
  const userId = req.user.userId;
  console.log('GETing box for userId: ', userId, ' and date: ', date);
  
  Box.findOne({pickUpDate: date, userId: userId})
    .then(result => {
      if (result) {
        console.log('the box has these contents: ', result.boxContents);
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
  console.log(typeof date, 'pickUpDate in post route');
  const {userId} = req.user; 
  const newBox = {
    pickUpDate: date,
    userId: userId
  };
 
  Box.create(newBox)
    .then(result => {
      (console.log('you made a new box', result.body));
      return res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:date', (req, res, next) => {
  const {date} = req.params;
  const {userId} = req.user;
  const {boxContents} = req.body;

  const updatedBox = {
    boxContents
  };
  console.log(updatedBox, boxContents, 'that\'s the updated box contents');

  Box.findOneAndUpdate({userId: userId, pickUpDate: date}, updatedBox, {new:true})
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = {router};