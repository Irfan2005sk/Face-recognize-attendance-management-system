const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('student')
      .populate('course');

    res.json(records);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
exports.getAttendanceReport = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('student')
      .populate('course');

    const report = records.map((record) => ({
      studentName: record.student?.name || 'Unknown',
      courseName: record.course?.name || 'Unknown',
      percentage:
        record.status === 'Present' ? 100 : 0
    }));

    res.json(report);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};