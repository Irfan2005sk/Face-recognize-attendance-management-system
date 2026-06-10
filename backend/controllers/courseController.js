const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

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

exports.getTopCourses = async (req, res) => {

  try {

    const topCourses =
      await Attendance.aggregate([

        {
          $group: {
            _id: '$course',
            attendanceCount: {
              $sum: 1
            }
          }
        },

        {
          $sort: {
            attendanceCount: -1
          }
        },

        {
          $limit: 5
        }

      ]);

    await Course.populate(
      topCourses,
      {
        path: '_id'
      }
    );

    res.json(topCourses);

  }

  catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};