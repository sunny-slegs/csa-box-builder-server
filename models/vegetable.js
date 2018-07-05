'use strict';

const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

vegetableSchema.index({name: 1, boxId: 1}, {unique: true});

vegetableSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Vegetable', vegetableSchema);