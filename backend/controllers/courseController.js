const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(course);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Course deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};