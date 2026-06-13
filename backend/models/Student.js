const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    course: {
      type: String
    },
    phone: {
      type: String
    },
    faceDescriptor: {
      type: [Number],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);