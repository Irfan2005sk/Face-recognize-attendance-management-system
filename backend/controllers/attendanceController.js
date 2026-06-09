const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {

    const { student, course, status } = req.body;

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

    const existingAttendance =
      await Attendance.findOne({

        student,

        date: {
          $gte: startOfDay,
          $lt: endOfDay
        }

      });

    if (existingAttendance) {

      return res.status(400).json({

        message:
          'Attendance already marked for today'

      });

    }

    const attendance =
      await Attendance.create({

        student,
        course,
        status

      });

    res.status(201).json(attendance);

  } catch (err) {

    res.status(400).json({

      message:
        err.message

    });

  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    let query = {};

    if (date) {
      const selectedDate = new Date(date);

      const startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      const endOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1
      );

      query.date = {
        $gte: startOfDay,
        $lt: endOfDay
      };
    }

    const records = await Attendance.find(query)
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

    const studentStats = {};

    records.forEach((record) => {
      const studentId = record.student._id.toString();

      if (!studentStats[studentId]) {
        studentStats[studentId] = {
          studentName: record.student.name,
          courseName: record.course.name,
          presentDays: 0,
          absentDays: 0
        };
      }

      if (record.status === 'Present') {
        studentStats[studentId].presentDays++;
      } else {
        studentStats[studentId].absentDays++;
      }
    });

    const report = Object.values(studentStats).map((student) => {
      const totalDays =
        student.presentDays + student.absentDays;

      const percentage =
        totalDays > 0
          ? ((student.presentDays / totalDays) * 100).toFixed(1)
          : 0;

      return {
        ...student,
        percentage
      };
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};