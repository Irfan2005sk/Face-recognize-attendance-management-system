const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const Attendance = require('../models/Attendance');
const PDFDocument = require('pdfkit');
const Student = require('../models/Student');
const sendEmail = require('../utils/sendEmail');

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

// Get monthly report for all students
exports.getMonthlyReport = async (req, res) => {
  try {

    const records = await Attendance.find()
      .populate('student');

    const stats = {};

    records.forEach(record => {

      const studentId = record.student._id.toString();

      if (!stats[studentId]) {

        stats[studentId] = {
          studentName: record.student.name,
          presentDays: 0,
          absentDays: 0
        };

      }

      if (record.status === 'Present') {

        stats[studentId].presentDays++;

      } else {

        stats[studentId].absentDays++;

      }

    });

    const report = Object.values(stats).map(student => {

      const totalDays =
        student.presentDays + student.absentDays;

      const percentage =
        totalDays > 0
          ? (
              student.presentDays /
              totalDays *
              100
            ).toFixed(1)
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

// Get top students based on attendance percentage
exports.getTopStudents = async (req, res) => {
  try {

    const records = await Attendance.find()
      .populate('student');

    const stats = {};

    records.forEach(record => {

      const studentId = record.student._id.toString();

      if (!stats[studentId]) {

        stats[studentId] = {

          studentName: record.student.name,
          presentDays: 0,
          absentDays: 0

        };

      }

      if (record.status === 'Present') {

        stats[studentId].presentDays++;

      } else {

        stats[studentId].absentDays++;

      }

    });

    const leaderboard = Object.values(stats)
      .map(student => {

        const totalDays =
          student.presentDays +
          student.absentDays;

        const percentage =
          totalDays > 0
            ? (
                student.presentDays /
                totalDays *
                100
              )
            : 0;

        return {

          ...student,
          percentage: Number(
            percentage.toFixed(1)
          )

        };

      })
      .sort(
        (a, b) =>
          b.percentage -
          a.percentage
      );

    res.json(leaderboard);

  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }
};
// Download attendance report as PDF
exports.downloadPDFReport = async (req, res) => {

  try {

    const records = await Attendance.find()
      .populate('student')
      .populate('course');

    const doc = new PDFDocument();

    res.setHeader(
      'Content-Type',
      'application/pdf'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=attendance-report.pdf'
    );

    doc.pipe(res);

    doc.fontSize(20)
      .text(
        'Attendance Report',
        {
          align: 'center'
        }
      );

    doc.moveDown();

    records.forEach(record => {

      doc.fontSize(12)
        .text(

          `Student: ${record.student?.name}
Course: ${record.course?.name}
Status: ${record.status}

`

        );

    });

    doc.end();

  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

// to download excel report
exports.downloadExcelReport = async (req, res) => {
  try {

    const records = await Attendance.find()
      .populate('student')
      .populate('course');

    const workbook = new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        'Attendance Report'
      );

    worksheet.columns = [
      {
        header: 'Student Name',
        key: 'studentName',
        width: 20
      },
      {
        header: 'Course',
        key: 'courseName',
        width: 20
      },
      {
        header: 'Status',
        key: 'status',
        width: 15
      },
      {
        header: 'Date',
        key: 'date',
        width: 25
      }
    ];

    records.forEach(record => {

      worksheet.addRow({

        studentName:
          record.student?.name,

        courseName:
          record.course?.name,

        status:
          record.status,

        date:
          record.date

      });

    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=attendance-report.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }
};

// course report
exports.getCourseReport = async (req, res) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.courseId
      )
    ) {
      return res.status(400).json({
        message: 'Invalid course ID'
      });
    }

    const records = await Attendance.find({
      course: req.params.courseId
    })
    .populate('student')
    .populate('course');

    const stats = {};

    records.forEach(record => {

      const studentId =
        record.student._id.toString();

      if (!stats[studentId]) {

        stats[studentId] = {

          studentName:
            record.student.name,

          presentDays: 0,

          absentDays: 0

        };

      }

      if (
        record.status === 'Present'
      ) {

        stats[studentId]
          .presentDays++;

      } else {

        stats[studentId]
          .absentDays++;

      }

    });

    const report =
      Object.values(stats)
        .map(student => {

          const totalDays =
            student.presentDays +
            student.absentDays;

          const percentage =
            totalDays > 0
              ? (
                  student.presentDays /
                  totalDays *
                  100
                ).toFixed(1)
              : 0;

          return {

            ...student,

            percentage

          };

        });

    res.json(report);

  } catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }
};

// weekly report
exports.getWeeklyReport = async (req, res) => {

  try {

    const records = await Attendance.find();

    const weeklyStats = {

      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0

    };

    records.forEach(record => {

      const day =
        new Date(record.date)
          .toLocaleDateString(
            'en-US',
            {
              weekday: 'long'
            }
          );

      weeklyStats[day]++;

    });

    res.json(weeklyStats);

  } catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};

// low attendance alert
exports.getLowAttendanceStudents = async (
  req,
  res
) => {

  try {

    const records = await Attendance.find()
      .populate('student');

    const stats = {};

    records.forEach(record => {

      const studentId =
        record.student._id.toString();

      if (!stats[studentId]) {

        stats[studentId] = {

          studentName:
            record.student.name,

          presentDays: 0,

          absentDays: 0

        };

      }

      if (
        record.status === 'Present'
      ) {

        stats[studentId]
          .presentDays++;

      } else {

        stats[studentId]
          .absentDays++;

      }

    });

    const lowAttendance =
      Object.values(stats)
        .map(student => {

          const totalDays =
            student.presentDays +
            student.absentDays;

          const percentage =
            totalDays > 0
              ? (
                  student.presentDays /
                  totalDays *
                  100
                )
              : 0;

          return {

            ...student,

            percentage:
              Number(
                percentage.toFixed(1)
              )

          };

        })
        .filter(
          student =>
            student.percentage < 75
        );

    res.json(
      lowAttendance
    );

  } catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};

// email alert for low attendance students
exports.sendLowAttendanceEmails =
async (req, res) => {

  try {

    const records =
      await Attendance.find()
        .populate('student');

    const stats = {};

    records.forEach(record => {

      const id =
        record.student._id.toString();

      if (!stats[id]) {

        stats[id] = {

          studentName:
            record.student.name,

          email:
            record.student.email,

          presentDays: 0,

          absentDays: 0

        };

      }

      if (
        record.status === 'Present'
      ) {

        stats[id].presentDays++;

      }

      else {

        stats[id].absentDays++;

      }

    });

    for (
      const student
      of Object.values(stats)
    ) {

      const total =
        student.presentDays +
        student.absentDays;

      const percentage =
        total > 0
          ? (
              student.presentDays /
              total *
              100
            )
          : 0;

      if (percentage < 75) {

        await sendEmail(

          student.email,

          'Low Attendance Warning',

          `Hello ${student.studentName},

Your attendance percentage is ${percentage.toFixed(1)}%.

Please improve your attendance.

Attendance Management System`

        );

      }

    }

    res.json({

      message:
        'Emails sent successfully'

    });

  }

  catch (err) {

    res.status(500).json({

      message:
        err.message

    });

  }

};