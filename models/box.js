'use strict';

const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  pickUpDate: {type: String, required: true},
  // boxId: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
  boxContents: {type: Array},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

boxSchema.index({pickUpDate: 1, userId: 1}, {unique: true});

boxSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Box', boxSchema);