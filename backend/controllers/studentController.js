const Student = require('../models/Student');

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
    const students = await Student.find().populate('course');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
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