const Attendance = require('../models/Attendance');
const PDFDocument = require('pdfkit');

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