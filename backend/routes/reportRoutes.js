const express = require('express');
const router = express.Router();

const {
  getStudentReport,
  getMonthlyReport,
  getTopStudents,
  downloadPDFReport
} = require('../controllers/reportController');

router.get('/students', getStudentReport);
router.get('/monthly', getMonthlyReport);
router.get('/top-students', getTopStudents);
router.get(
  '/pdf',
  downloadPDFReport
);

module.exports = router;