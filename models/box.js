'use strict';

const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  pickUpDate: {type: String, required: true},
  vegetables: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

boxSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Box', boxSchema);