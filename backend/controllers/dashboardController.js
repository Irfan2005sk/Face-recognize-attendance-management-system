const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();

    const totalAttendance = await Attendance.countDocuments();

    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const todayAttendance = await Attendance.countDocuments({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    let attendanceRate = 0;

    if (totalStudents > 0) {
      attendanceRate = (
        (todayAttendance / totalStudents) *
        100
      ).toFixed(1);
    }

    res.json({
      totalStudents,
      totalCourses,
      totalAttendance,
      todayAttendance,
      attendanceRate
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};