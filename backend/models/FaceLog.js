const mongoose = require('mongoose');

const faceLogSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },

  confidence: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: 'Success'
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model(
    'FaceLog',
    faceLogSchema
  );