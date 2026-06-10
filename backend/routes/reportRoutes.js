const express = require('express');
const router = express.Router();

const {
  getStudentReport,
  getMonthlyReport,
  getTopStudents,
  downloadPDFReport,
  downloadExcelReport,
  getCourseReport,
  getWeeklyReport,
  getLowAttendanceStudents,
  sendLowAttendanceEmails
} = require('../controllers/reportController');

router.get('/students', getStudentReport);
router.get('/monthly', getMonthlyReport);
router.get('/top-students', getTopStudents);
router.get('/pdf', downloadPDFReport);
router.get('/excel', downloadExcelReport);
router.get('/course/:courseId', getCourseReport);
router.get('/weekly', getWeeklyReport);
router.get('/low-attendance', getLowAttendanceStudents);
router.get('/send-low-attendance-emails', sendLowAttendanceEmails);

module.exports = router;