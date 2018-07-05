'use strict';
const express = require('express');
const passport = require('passport');
let mongoose = require('mongoose');

const Box = require('../models/box');
const Vegetable = require('../models/vegetable');
const BoxContents = require('../models/box-content');
const {availableVegetables} = require('../available-vegetables'); 

const router = express.Router();

// protect endpoints
router.use(passport.authenticate('jwt', {session: false, failWithError: true}));

//get box by id
router.get('/:date', (req, res, next) => {
  const date = req.params.date;
  const userId = req.user.userId;
  
  Box.findOne({pickUpDate: date, userId: userId})
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
  const {boxContents} = req.body;
  
  const newBox = {
    pickUpDate: date,
    userId: mongoose.Types.ObjectId(userId)
  };
  // console.log('you just created this box:', newBox);
  if (boxContents) {
    boxContents.create(boxContents)
      .then(res => {
        console.log('you added box contents:', res.Vegetables);
        return res.status(201).json(res);
      })
      .catch(err => {
        next(err);
      });
  } else {
    Box.create(newBox)
      .then(result => {
        (console.log('you made a new box', res.vegetables));
        return res.status(201).json(result);
      })
      .catch(err => {
        next(err);
      });
  }  
});

  

// router.put('/:date', (req, res, next) => {
//   const {date} = req.params;
//   const {userId} = req.user;
//   const {vegetables} = req.body;

//   const updatedBox = {
//     vegetables
//   };

//   Box.findOneAndUpdate({userId: userId, pickUpDate: date}, updatedBox, {new:true})
//     .then(result => {
//       return res.status(201).json(result);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = {router};