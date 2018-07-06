// 'use strict';

// const mongoose = require('mongoose');

// const boxContentSchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   boxId: {type: mongoose.Schema.Types.ObjectId, ref: 'Box'},
//   pickUpDate: {type: String, required: true, ref: 'Box'},
//   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true}
// });

// boxContentSchema.index({name: 1, boxId: 1}, {unique: true});

// boxContentSchema.set('toObject', {
//   virtuals: true,
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//   }
// });

// module.exports = mongoose.model('BoxContents', boxContentSchema);