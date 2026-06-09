const Attendance = require('../models/Attendance');

exports.getStudentReport = async (req, res) => {
  try {
    const report = await Attendance.aggregate([
      {
        $group: {
          _id: {
            student: '$student',
            status: '$status'
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};