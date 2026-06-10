const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

// Create student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all students
exports.getStudents = async (req, res) => {

  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const sort =
      req.query.sort || 'name';

    const skip =
      (page - 1) * limit;

    const students =
      await Student.find()
        .populate('course')
        .sort({
          [sort]: 1
        })
        .skip(skip)
        .limit(limit);

    const totalStudents =
      await Student.countDocuments();

    res.json({

      currentPage: page,

      totalPages:
        Math.ceil(
          totalStudents / limit
        ),

      totalStudents,

      students

    });

  }

  catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Student deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Search students
exports.searchStudents = async (req, res) => {
  try {
    const { name } = req.query;

    const students = await Student.find({
      name: {
        $regex: name,
        $options: 'i'
      }
    }).populate('course');

    res.json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Get student by name
exports.getStudentByName = async (
  req,
  res
) => {

  try {

    const student =
      await Student.findOne({

        name: req.params.name

      });

    if (!student) {

      return res.status(404).json({

        message:
          'Student not found'

      });

    }

    res.json(student);

  } catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};

// Get student attendance history
exports.getStudentHistory = async (
  req,
  res
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Invalid student ID'
    });
  }

  try {

    const records =
      await Attendance.find({

        student:
          req.params.id

      })
        .populate('course')
        .sort({

          date: -1

        });

    res.json(records);

  }

  catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};